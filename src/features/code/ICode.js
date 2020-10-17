import React from 'react';
import CodeEditor from '../../shared/CodeEditor';
import './ICode.css';

const HTML_SAMPLE = `
<div class='twenty-one-pilots'>Twenty One Pilots</div>
`;

const CSS_SAMPLE = `
.twenty-one-pilots {
  color: red;
}
`;

const JS_SAMPLE = `
  function sayHello() {
    console.log('Hello world');
  }

  sayHello();
`;

export default function ICode() {
  return (
    <div className='icode__grid-container px-2'>
      <div className='icode__html'>
        <CodeEditor
          title='HTML'
          language='html'
          value={HTML_SAMPLE}
        ></CodeEditor>
      </div>
      <div className='icode__css'>
        <CodeEditor title='CSS' language='css' value={CSS_SAMPLE}></CodeEditor>
      </div>
      <div className='icode__js'>
        <CodeEditor
          title='JS'
          language='javascript'
          value={JS_SAMPLE}
        ></CodeEditor>
      </div>
      <div className='icode__output d-flex justify-content-center align-items-center text-secondary'>
        No content to show here for the moment
      </div>
    </div>
  );
}
