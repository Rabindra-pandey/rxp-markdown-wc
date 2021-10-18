import { LitElement, html, customElement, property } from 'lit-element';
import { getFromAPI, setRenderingFrom, setTargetBlank } from './markDownSvc';
import { defaultMarkDownAPI, loading } from './constants';

@customElement('rnp-markdown')
export class RnpMarkdown extends LitElement {
  constructor() {
    super();
    this.markdown = '';
    this.markdownapi = defaultMarkDownAPI;
    this.result = loading;
    this.isclientsiderender = '';
    this.targetblanckactive = '';
  }
  @property({ type: String }) markdown;
  @property({ type: String }) markdownapi;
  @property({ type: String }) result;
  @property({ type: String }) isclientsiderender;
  @property({ type: String }) targetblanckactive;

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'targetblanckactive' && newValue === 'true') {
      setTargetBlank(newValue);
    } else if (name === 'isclientsiderender' && newValue === 'true') {
      setRenderingFrom(newValue);
    } else if (name === 'markdown') {
      getFromAPI(newValue, this.markdownapi).then((data) => {
        this.result = html`${data}`;
      });
    }
  }

  render() {
    return this.result;
  }
}
