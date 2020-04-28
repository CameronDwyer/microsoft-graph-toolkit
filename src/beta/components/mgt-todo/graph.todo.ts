/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { DateTimeTimeZone, ItemBody, PatternedRecurrence } from '@microsoft/microsoft-graph-types-beta';
import { IGraph } from '../../../IGraph';
import { prepScopes } from '../../../utils/GraphHelpers';

// tslint:disable
export interface LinkedResource {
  id: string;
  webUrl: string;
  applicationName: string;
  displayName: string;
  externalId: string;
}

export enum TaskStatus {
  notStarted,
  inProgress,
  completed,
  deferred,
  waitingOnOthers
}

export enum TaskImportance {
  low,
  normal,
  high
}

export enum WellknownListName {
  none,
  default,
  flaggedEmails,
  unknownFutureValue
}

export interface TodoTask {
  id: string;
  title: string;
  body: ItemBody;
  importance: TaskImportance;
  status: TaskStatus;
  createdDateTime: Date;
  completedDateTime: DateTimeTimeZone;
  lastModifiedDate: Date;
  bodyLastModifiedDateTime: Date;
  dueDateTime: DateTimeTimeZone;
  isReminderOn: boolean;
  reminderDateTime: DateTimeTimeZone;
  recurrence: PatternedRecurrence;
  linkedResources: LinkedResource[];
}

export interface TodoTaskList {
  id: string;
  displayName: string;
  tasks: TodoTask[];
  isOwner: boolean;
  isShared: boolean;
  wellknownName: WellknownListName;
}
// tslint:enable

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<TodoTask[]>}
 */
export async function getTodoTasks(graph: IGraph, listId: string): Promise<TodoTask[]> {
  const tasks = await graph
    .api(`/me/todo/lists/${listId}/tasks`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.Read'))
    .get();

  return tasks && tasks.value;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @returns {Promise<TodoTask>}
 */
export async function getTodoTask(graph: IGraph, listId: string, taskId: string): Promise<TodoTask> {
  const task = await graph
    .api(`/me/todo/lists/${listId}/tasks/${taskId}`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.Read'))
    .get();

  return task && task.value;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @returns {Promise<TodoTaskList[]>}
 */
export async function getTodoTaskLists(graph: IGraph): Promise<TodoTaskList[]> {
  const taskLists = await graph
    .api('/me/todo/lists')
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.Read'))
    .get();

  return taskLists && taskLists.value;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<TodoTaskList>}
 */
export async function getTodoTaskList(graph: IGraph, listId: string): Promise<TodoTaskList> {
  const taskList = await graph
    .api(`/me/todo/lists/${listId}`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.Read'))
    .get();

  return taskList && taskList.value;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {{ title: string }} taskData
 * @returns {Promise<TodoTask>}
 */
export async function createTodoTask(
  graph: IGraph,
  listId: string,
  // tslint:disable-next-line: completed-docs
  taskData: { title: string }
): Promise<TodoTask> {
  const task: TodoTask = await graph
    .api(`/me/todo/lists/${listId}/tasks`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.ReadWrite'))
    .post(taskData);

  return task;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {{ displayName: string }} list
 * @returns {Promise<TodoTaskList>}
 */
// tslint:disable-next-line: completed-docs
export async function createTodoTaskList(graph: IGraph, listData: { displayName: string }): Promise<TodoTaskList> {
  const list: TodoTaskList = await graph
    .api('/me/todo/lists')
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.ReadWrite'))
    .post(listData);

  return list;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @returns {Promise<void>}
 */
export async function deleteTodoTask(graph: IGraph, listId: string, taskId: string): Promise<void> {
  await graph
    .api(`/me/todo/lists/${listId}/tasks/${taskId}`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.ReadWrite'))
    .delete();
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<void>}
 */
export async function deleteTodoTaskList(graph: IGraph, listId: string): Promise<void> {
  await graph
    .api(`/me/todo/lists/${listId}`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.ReadWrite'))
    .delete();
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @param {TodoTask} taskData
 * @returns {Promise<TodoTask>}
 */
export async function updateTodoTask(
  graph: IGraph,
  listId: string,
  taskId: string,
  taskData: TodoTask
): Promise<TodoTask> {
  const task = await graph
    .api(`/me/todo/lists/${listId}/tasks/${taskId}`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.ReadWrite'))
    .patch(taskData);

  return task;
}

/**
 * foo
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {TodoTaskList} taskListData
 * @returns {Promise<TodoTaskList>}
 */
export async function updateTodoTaskList(
  graph: IGraph,
  listId: string,
  taskListData: TodoTaskList
): Promise<TodoTaskList> {
  const task = await graph
    .api(`/me/todo/lists/${listId}`)
    .header('Cache-Control', 'no-store')
    .middlewareOptions(prepScopes('Tasks.ReadWrite'))
    .patch(taskListData);

  return task;
}
