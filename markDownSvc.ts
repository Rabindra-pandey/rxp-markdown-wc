import marked from 'marked';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export const fetchMarkdown = async (
  markdown,
  markdownapi,
  openlinksinnewtab
) => {
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
    return getFromLocal(markdown, openlinksinnewtab);
  }
};

export const getFromLocal = (markdown, openlinksinnewtab) => {
  return unsafeHTML(marked(markdown));
};

export const setLinkTarget = (links, target) => {
  links.forEach((a) => {
    if (target) {
      a.setAttribute('target', target);
      a.setAttribute('rel', 'noopener noreferrer');
    } else {
      a.removeAttribute('target');
      a.removeAttribute('rel');
    }
  });
};
