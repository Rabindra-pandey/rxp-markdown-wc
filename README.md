## Overview

Reusable web component using LitElement and Typescript that can render Markdown. The component is able to render the Markdown client side, or send the Markdown to an API endpoint to be rendered.

### Input

Rendering using markdown attribute

```html
    <rnp-markdown markdown="## Hello World"> </rnp-markdown>
```

We can add markdown and markdownapi as attribute within the element

```html
    <rnp-markdown
      markdownapi="https://md-api-vert.vercel.app/api/markdown"
      markdown="## Server Side"
    > </rnp-markdown>
```

We can set the attribute using javascript custom function

```html
    <textarea id="markDownSrc" type="aria" cols="30" rows="4">## Welcome to *renderMarkDown*</textarea>
    <input type="button" onclick="renderMarkDown()" value="Render Markdown" style="display: block; margin: 5px 0">

    <rnp-markdown id="md"> </rnp-markdown>

    <script>
      function renderMarkDown() {
        const content = document.getElementById('markDownSrc').value;
        document.getElementById('md').setAttribute('markdown', content);
      }
    </script>
```

Output

```html
<rnp-markdown>
  #shadow-root (open)
  <h2 id="hello-world">Hello World</h2>
</rnp-markdown>
```

We can install it from NPM using `npm i rnp-markdown` and consume it via public/bundle.js
