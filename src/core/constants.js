export const HTML_CONFIG = {
  editorTitle: 'HTML',
  language: 'html',
  sample: `
<div class="container">
  <h1> Playground area </h1>
  <button onclick="greet()">Click me</button>
</div>`,
};

export const CSS_CONFIG = {
  editorTitle: 'CSS',
  language: 'css',
  sample: `
body {
    margin: 0;
    padding: 0;
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: darkcyan;
}

.container button {
    padding: 1rem 1.5rem;
    border: 0;
    border-radius: 5px;
    background-color: darkcyan;
    color: #fff;
    cursor: pointer;
    transition: box-shadow .4s ease-in;
}

.container button:hover {
    box-shadow: 0 0 7px #000;
}`,
};

export const JS_CONFIG = {
  editorTitle: 'JS',
  language: 'javascript',
  sample: `
function greet() {
  alert('Welcome to playground area! Have fun :)');
}`,
};

export const LAYOUT_TYPE_1 = 'layout-1';
export const LAYOUT_TYPE_2 = 'layout-2';
export const LAYOUT_TYPE_3 = 'layout-3';
export const LAYOUT_TYPE_4 = 'layout-4';

export const baseURL = 'http://localhost:8080';
export const notificationServiceBaseURL = 'http://localhost:8081';

export const X_WRK_DIRECTORY = 'x-wrk-directory';
