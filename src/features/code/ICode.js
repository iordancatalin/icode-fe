import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  CSS_EDITOR_TITLE,
  HTML_EDITOR_TITLE,
  JS_EDITOR_TITLE,
  HTML_SAMPLE,
  CSS_SAMPLE,
  JS_SAMPLE,
} from '../../core/constants';
import CodeEditor from '../../shared/CodeEditor';
import './ICode.css';
import { executeCode } from './ICodeService';

export default function ICode() {
  const [outputEndpoint, setOutputEndpoint] = useState();

  const htmlValueRef = useRef(HTML_SAMPLE);
  const cssValueRef = useRef(CSS_SAMPLE);
  const jsValueRef = useRef(JS_SAMPLE);

  const createRequestBody = () => ({
    html: htmlValueRef.current,
    css: cssValueRef.current,
    js: jsValueRef.current,
  });

  const handleExecution = async () => {
    const requestBody = createRequestBody();
    const response = await executeCode(requestBody);
    const responseBody = await response.json();

    if (responseBody?.endpoint) {
      setOutputEndpoint(responseBody.endpoint);
    }
  };

  useEffect(() => { handleExecution(); }, []);

  return (
    <div className='icode__grid-container px-2'>
      <div className='icode__html'>
        <CodeEditor
          title={HTML_EDITOR_TITLE}
          language='html'
          valueRef={htmlValueRef}
          onExecution={handleExecution}
        ></CodeEditor>
      </div>
      <div className='icode__css'>
        <CodeEditor
          title={CSS_EDITOR_TITLE}
          language='css'
          valueRef={cssValueRef}
          onExecution={handleExecution}
        ></CodeEditor>
      </div>
      <div className='icode__js'>
        <CodeEditor
          title={JS_EDITOR_TITLE}
          language='javascript'
          valueRef={jsValueRef}
          onExecution={handleExecution}
        ></CodeEditor>
      </div>
      <div className='icode__output'>
        <iframe
          className='h-100 w-100 border-0'
          src={outputEndpoint}
          title='Execution Result'
        ></iframe>
      </div>
    </div>
  );
}
