import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const EditorContainer = styled.div`
  overflow: hidden;
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
  color: ${({ theme }) => theme.editor.header.color};
  display: flex;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.editor.header.background};
  border-bottom: 1px solid ${({ theme }) => theme.editor.header.borderColor};
`;

const ToggleMaximizeButton = styled.button.attrs(() => ({
  className: 'border-0 bg-transparent',
}))`
  color: ${({ theme }) => theme.editor.header.color};
  transition: 0.3s color ease-out;

  &:hover {
    color: ${({ theme }) => theme.foreground.secondary};
  }

  &:focus {
    outline: none;
  }
`;

export default function CodeEditorComponent({
  title,
  language,
  valueRef,
  onExecution,
  dimension,
  theme = 'dark',
}) {
  const [maximized, setMaximized] = useState(false);
  const [editorDimension, setEditorDimension] = useState({
    width: '100%',
    height: '100%',
  });

  const editorRef = useRef();
  const editorContainerRef = useRef();

  const timeoutId = useRef();
  const valueGetter = useRef();

  useEffect(() => {
    const calculateEditorDimension = () => {
      if (dimension) {
        return {
          width: `${dimension.width}px`,
          height: `${dimension.height}px`,
        };
      } else if (editorContainerRef.current) {
        const {
          width,
          height,
        } = editorContainerRef.current.getBoundingClientRect();
        return { width: `${width}px`, height: `${height}px` };
      }

      return { width: '100%', height: '100%' };
    };

    if (editorRef.current) setTimeout(() => editorRef.current.layout(), 0);

    const newEditorDimension = calculateEditorDimension();
    setEditorDimension(newEditorDimension);
  }, [dimension]);

  const handleEditorDidMount = (_valueGetter, _monacoEditor) => {
    editorRef.current = _monacoEditor;
    valueGetter.current = _valueGetter;

    editorRef.current.onDidChangeModelContent(() => {
      valueRef.current = valueGetter.current();

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      const executionEvent = { type: 'execution', changed: title };
      timeoutId.current = setTimeout(() => onExecution(executionEvent), 1000);
    });
  };

  const handleToggleMaximizeClick = () => {
    setTimeout(() => editorRef.current.layout(), 0);
    setMaximized((prevState) => !prevState);
  };

  return (
    <EditorContainer
      maximized={maximized}
      ref={editorContainerRef}
      width={editorDimension.width}
      height={editorDimension.height}
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
        theme={theme}
        value={valueRef.current}
        width='100%'
        height='calc(100% - 2.5rem)'
        editorDidMount={handleEditorDidMount}
      ></Editor>
    </EditorContainer>
  );
}
