import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const EditorContainer = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  ${({ maximized }) =>
    maximized &&
    css`
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100vw !important;
      height: 100vh !important;
    `}
`;

const EditorHeader = styled.div.attrs(() => ({
  className: 'p-2 font-montserrat',
}))`
  color: #6c757d;
  display: flex;
  justify-content: flex-start;
  background-color: #202124;
  border-bottom: 1px solid #4a4545;
`;

const ToggleMaximizeButton = styled.button.attrs(() => ({
  className: 'border-0 bg-transparent',
}))`
  color: #6c757d;
  transition: 0.3s color ease-out;

  &:hover {
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export default function CodeEditor({ title, language, valueRef, onExecution }) {
  const [maximized, setMaximized] = useState(false);
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('100%');

  const editorRef = useRef();
  const editorContainerRef = useRef();

  const timeoutId = useRef();
  const valueGetter = useRef();

  useEffect(() => {
    if (editorContainerRef.current) {
      const { width, height, } = editorContainerRef.current.getBoundingClientRect();
      setWidth(`${width}px`);
      setHeight(`${height}px`);
    }
  }, []);

  const handleEditorDidMount = (_valueGetter, _monacoEditor) =>{
    editorRef.current = _monacoEditor;
    valueGetter.current = _valueGetter;

    editorRef.current.onDidChangeModelContent(() => {
      valueRef.current = valueGetter.current();

      if(timeoutId.current) { clearTimeout(timeoutId.current) }
      const executionEvent = { type: 'execution', changed: title, };
      timeoutId.current = setTimeout(() => onExecution(executionEvent), 1000);
    })
  };

  const handleToggleMaximizeClick = () => {
    setTimeout(() => editorRef.current.layout(), 0);
    setMaximized((prevState) => !prevState);
  };

  return (
    <EditorContainer
      maximized={maximized}
      ref={editorContainerRef}
      width={width}
      height={height}
    >
      <EditorHeader>
        {title}
        <div className='flex-grow-1 d-flex justify-content-end'>
          <ToggleMaximizeButton onClick={handleToggleMaximizeClick}>
            <FontAwesomeIcon icon='window-maximize'></FontAwesomeIcon>
          </ToggleMaximizeButton>
        </div>
      </EditorHeader>
      <Editor
        language={language}
        theme='dark'
        value={valueRef.current}
        width='100%'
        height='calc(100% - 2.5rem)'
        editorDidMount={handleEditorDidMount}
      ></Editor>
    </EditorContainer>
  );
}
