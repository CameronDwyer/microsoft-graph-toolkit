/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { customElement, html, TemplateResult } from 'lit-element';
import { Providers } from '../../../../../Providers';
import { ProviderState } from '../../../../../providers/IProvider';
import { BetaGraph } from '../../../../BetaGraph';
import { BasePersonCardSection } from '../BasePersonCardSection';
import { styles } from './mgt-person-card-files-css';

/**
 * foo
 *
 * @export
 * @class MgtPersonCardProfile
 * @extends {MgtTemplatedComponent}
 */
@customElement('mgt-person-card-files')
export class MgtPersonCardFiles extends BasePersonCardSection {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return styles;
  }

  /**
   * foo
   *
   * @readonly
   * @type {string}
   * @memberof MgtPersonCardFiles
   */
  public get displayName(): string {
    return 'Files';
  }

  /**
   * foo
   *
   * @returns {TemplateResult}
   * @memberof MgtPersonCardFiles
   */
  public renderCompactView(): TemplateResult {
    return html`
      compact
    `;
  }

  /**
   * foo
   *
   * @returns {TemplateResult}
   * @memberof MgtPersonCardFiles
   */
  public renderIcon(): TemplateResult {
    return html`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 8C17.1354 8 17.263 8.02604 17.3828 8.07812C17.5078 8.13021 17.6146 8.20312 17.7031 8.29688C17.7969 8.38542 17.8698 8.48958 17.9219 8.60938C17.974 8.72917 18 8.85677 18 8.99219C18 9.14844 17.9635 9.29948 17.8906 9.44531L14.6172 16H2V5C2 4.85938 2.02604 4.72917 2.07812 4.60938C2.13021 4.48958 2.20052 4.38542 2.28906 4.29688C2.38281 4.20312 2.48958 4.13021 2.60938 4.07812C2.72917 4.02604 2.85938 4 3 4H5.75C5.98438 4 6.1849 4.02604 6.35156 4.07812C6.52344 4.125 6.67448 4.1849 6.80469 4.25781C6.9401 4.33073 7.0599 4.41146 7.16406 4.5C7.26823 4.58854 7.3724 4.66927 7.47656 4.74219C7.58594 4.8151 7.70052 4.8776 7.82031 4.92969C7.94531 4.97656 8.08854 5 8.25 5H14C14.1406 5 14.2708 5.02604 14.3906 5.07812C14.5104 5.13021 14.6146 5.20312 14.7031 5.29688C14.7969 5.38542 14.8698 5.48958 14.9219 5.60938C14.974 5.72917 15 5.85938 15 6V8H17ZM3 13.3828L5.41406 8.55469C5.5026 8.38281 5.625 8.2474 5.78125 8.14844C5.94271 8.04948 6.11979 8 6.3125 8H14V6H8.25C8.01562 6 7.8125 5.97656 7.64062 5.92969C7.47396 5.8776 7.32292 5.8151 7.1875 5.74219C7.05729 5.66927 6.9401 5.58854 6.83594 5.5C6.73177 5.41146 6.625 5.33073 6.51562 5.25781C6.41146 5.1849 6.29688 5.125 6.17188 5.07812C6.05208 5.02604 5.91146 5 5.75 5H3V13.3828ZM17 9H6.3125L3.3125 15H14L17 9Z"
        />
      </svg>
    `;
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  protected render() {
    return html``;
  }

  /**
   * load state into the component
   *
   * @protected
   * @returns {Promise<void>}
   * @memberof MgtPersonCardProfile
   */
  protected async loadState(): Promise<void> {
    const provider = Providers.globalProvider;

    // check if user is signed in
    if (!provider || provider.state !== ProviderState.SignedIn) {
      return;
    }

    if (!this.personDetails) {
      return;
    }

    const graph = provider.graph.forComponent(this);
    const betaGraph = BetaGraph.fromGraph(graph);

    // const userId = this.personDetails.id;
    // const profile = await getProfile(betaGraph, userId);

    // this.profile = profile;
    this.requestUpdate();
  }
}
