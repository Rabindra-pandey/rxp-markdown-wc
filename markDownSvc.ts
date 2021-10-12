import marked from 'marked';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export const getFromAPI = async (markdown, markdownapi) => {
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
};

export const getFromLocal = (markdown) => unsafeHTML(marked(markdown));
