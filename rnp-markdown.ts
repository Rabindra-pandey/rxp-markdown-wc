import { LitElement, html, customElement, property } from 'lit-element';
import { fetchMarkdown, getFromLocal, setLinkTarget } from './markDownSvc';
import { defaultMarkDownAPI, loading } from './constants';
import { queryAll } from 'lit-element/lib/decorators.js';

@customElement('rnp-markdown')
export class RnpMarkdown extends LitElement {
  @queryAll('a') _links;

  constructor() {
    super();
    this.markdown = '';
    this.markdownapi = defaultMarkDownAPI;
    this._result = loading;
    this.parseonserver = 'false';
    this.openlinksinnewtab = 'true';
  }
  @property({ type: String }) markdown;
  @property({ type: String }) markdownapi;
  @property({ type: String }) _result;
  @property({ type: String }) parseonserver;
  @property({ type: String }) openlinksinnewtab;

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'openlinksinnewtab') {
      this.openlinksinnewtab = newValue;
    }
    if (name === 'parseonserver') {
      this.parseonserver = newValue;
    }
    if (name === 'markdown') {
      const markdown = name === 'markdown' ? newValue : this.markdown;
      if (this.parseonserver.toLowerCase() === 'true') {
        fetchMarkdown(markdown, this.markdownapi, this.openlinksinnewtab).then(
          (data) => {
            this._result = html`${data}`;
          }
        );
      } else {
        this._result = getFromLocal(markdown, this.openlinksinnewtab);
      }
    }
  }

  updated() {
    const target =
      this.openlinksinnewtab.toLowerCase() === 'true' ? '_blank' : '';
    setLinkTarget(this._links, target);
  }

  render() {
    return this._result;
  }
}
