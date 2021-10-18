## Overview

Reusable web component using LitElement and Typescript that can render Markdown. The component is able to render the Markdown client side, or send the Markdown to an API endpoint to be rendered.

## User options

We can pass the below attribute-

- clientsideactive (Use to render markdown client side. default is false)
- targetblanckactive (Use to active target="\_blank" for anchor tag. default is false)
- markdown (Use to add markdown content)
- markdownapi (Use to add api end point content)

### Input

Rendering using markdown attribute. It will render server side markdown by default if we passed only markdown attribute or used setAttribute with dynamic content. If any error is there from api end, it will fallback to client side rendering.

```html
    <rnp-markdown markdown="## Hello World"> </rnp-markdown>

    OR

    <rnp-markdown id="md"> </rnp-markdown>
    <script>
      document.getElementById('md').setAttribute('markdown', '## Hello World');
    </script>
```

We can add clientsideactive, markdown and targetblanckactive as attribute within the element. By default, it will render the data from server side itself.

```html
    <rnp-markdown
      clientsideactive="true"
      targetblanckactive="true"
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
