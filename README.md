## Overview

Reusable web component using LitElement and Typescript that can render Markdown. The component is able to render the Markdown client side, or send the Markdown to an API endpoint to be rendered.

### Input

To use the rnp-markdown component, We need to follow the below steps. This component will render markdown from client side by default if we added only markdown attribute or used setAttribute using javascript for the dynamic content. If any error is there from api end, it will fallback to client side rendering.

### User options

We can pass the below attribute for configuration-

- **parseonserver** (Use to render markdown server side if we added the value as true. default is false)
- **openlinksinnewtab** (Use to add target="\_blank" for anchor tag if we added the value as true. default is false)
- **markdown** (Use to add markdown content)
- **markdownapi** (Use to add api end point. If we assigned the parseonserver attribute as true, it will take the default value['https://md-api-vert.vercel.app/api/markdown'] else will take user provided value)

```html
    <rnp-markdown markdown="## Hello World"> </rnp-markdown>

    OR

    <rnp-markdown id="md"> </rnp-markdown>
    <script>
      document.getElementById('md').setAttribute('markdown', '## Hello World');
    </script>
```

We can add parseonserver, openlinksinnewtab, markdown and markdownapi as attribute within the rnp-markdown component. By default, it will render from client side itself.

```html
    <rnp-markdown
      parseonserver="true"
      openlinksinnewtab="true"
      markdown="## Server Side"
      markdownapi="https://md-api-vert.vercel.app/api/markdown"
    > </rnp-markdown>
```

We can set the attribute using javascript

```html
    <textarea id="markDownSrc" type="aria" cols="40" rows="5">## Welcome to *renderMarkDown*</textarea>
    <input type="button" onclick="renderMarkDown()" value="Render Markdown" style="display: block; margin: 5px 0">

    <rnp-markdown id="md"> </rnp-markdown>

    <script>
      function renderMarkDown() {
        const content = document.getElementById('markDownSrc').value;
        document.getElementById('md').setAttribute('markdown', content);
      }
    </script>
```

### Output

```html
<rnp-markdown>
  #shadow-root (open)
  <h2 id="hello-world">Hello World</h2>
</rnp-markdown>
```

We can install it from npm using `npm i rnp-markdown` command.

To use this component in angular, we need to install it using the above command and import it into angular main.ts file.

main.ts

```ts
  import 'rnp-markdown/public/bundle.js';
```

app.module.ts

```ts
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
```

app.component.html

```html
  <textarea [(ngModel)]="overRideRate" type="aria" cols="40" rows="5">## Welcome</textarea>
  <input type="button" (click)="renderMarkDown()" value="Render Markdown" style="display: block; margin: 5px 0">


  <rnp-markdown [attr.markdown]="cnt"></rnp-markdown>
```

app.component.ts

```ts
  export class AppComponent  {
    cnt = '## Hello World';
    overRideRate = "";

    renderMarkDown() {
      this.cnt = this.overRideRate;
    }
  }
```
