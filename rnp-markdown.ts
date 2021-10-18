import { LitElement, html, customElement, property } from 'lit-element';
import { fetchMarkdown, setRenderingFrom, setTargetBlank } from './markDownSvc';
import { defaultMarkDownAPI, loading } from './constants';

@customElement('rnp-markdown')
export class RnpMarkdown extends LitElement {
  constructor() {
    super();
    this.markdown = '';
    this.markdownapi = defaultMarkDownAPI;
    this._result = loading;
    this.clientsideactive = '';
    this.targetblanckactive = '';
  }
  @property({ type: String }) markdown;
  @property({ type: String }) markdownapi;
  @property({ type: String }) _result;
  @property({ type: String }) clientsideactive;
  @property({ type: String }) targetblanckactive;

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'targetblanckactive' && newValue === 'true') {
      setTargetBlank(newValue);
    } else if (name === 'clientsideactive' && newValue === 'true') {
      setRenderingFrom(newValue);
    } else if (name === 'markdown') {
      fetchMarkdown(newValue, this.markdownapi).then((data) => {
        this._result = html`${data}`;
      });
    }
  }

  render() {
    return this._result;
  }
}
