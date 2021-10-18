import marked from 'marked';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

let isClientSide = 'false';
let isTargetBlankActive = 'false';

export const fetchMarkdown = async (markdown, markdownapi) => {
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
      return unsafeHTML(configMarkdown(res));
    } catch (error) {
      return getFromLocal(markdown);
    }
  }
};

export const getFromLocal = (markdown) =>
  unsafeHTML(configMarkdown(marked(markdown)));

export const setRenderingFrom = (val) => (isClientSide = val);

export const setTargetBlank = (val) => (isTargetBlankActive = val);

const configMarkdown = (res) => {
  if (isTargetBlankActive === 'true') {
    return res.replaceAll('<a', "<a target='_blank' ");
  }
  return res;
};
