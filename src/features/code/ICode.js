import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { CSS_CONFIG, HTML_CONFIG, JS_CONFIG } from '../../core/constants';
import CodeEditor from '../../shared/CodeEditor';
import './ICode.css';
import { executeCode } from './ICodeService';

export default function ICode() {
  const [outputEndpoint, setOutputEndpoint] = useState();

  const htmlValueRef = useRef(HTML_CONFIG.sample);
  const cssValueRef = useRef(CSS_CONFIG.sample);
  const jsValueRef = useRef(JS_CONFIG.sample);

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

  useEffect(() => {
    handleExecution();
  }, []);

  return (
    <div className='icode__grid-container px-2'>
      <div className='icode__html'>
        <CodeEditor
          title={HTML_CONFIG.editorTitle}
          language={HTML_CONFIG.language}
          valueRef={htmlValueRef}
          onExecution={handleExecution}
        ></CodeEditor>
      </div>
      <div className='icode__css'>
        <CodeEditor
          title={CSS_CONFIG.editorTitle}
          language={CSS_CONFIG.language}
          valueRef={cssValueRef}
          onExecution={handleExecution}
        ></CodeEditor>
      </div>
      <div className='icode__js'>
        <CodeEditor
          title={JS_CONFIG.editorTitle}
          language={JS_CONFIG.language}
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
