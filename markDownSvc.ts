import marked from 'marked';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

let isClientSide = 'false';
let isTargetBlankActive = 'false';

export const fetchMarkdown = async (markdown, markdownapi) => {
  configMarkdown();
  if (isClientSide === 'true') {
    return getFromLocal(markdown);
  } else {
    try {
      const rawResponse = await fetch(markdownapi, {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'text/plain',
        },
        body: markdown,
      });

      const res = await rawResponse.text();
      return unsafeHTML(res);
    } catch (error) {
      return getFromLocal(markdown);
    }
  }
};

export const getFromLocal = (markdown) => unsafeHTML(marked(markdown));

export const setRenderingFrom = (val) => (isClientSide = val);

export const setTargetBlank = (val) => (isTargetBlankActive = val);

const configMarkdown = () => {
  if (isTargetBlankActive === 'true') {
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      const link = marked.Renderer.prototype.link.call(this, href, title, text);
      return link.replace('<a', "<a target='_blank' ");
    };
    marked.setOptions({
      renderer: renderer,
    });
  }
};
