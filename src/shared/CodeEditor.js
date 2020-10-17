import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from '@monaco-editor/react';
import React from 'react';
import styled from 'styled-components';

const EditorHeader = styled.div.attrs(() => ({
  className: 'p-2 font-montserrat',
}))`
  color: #6c757d;
  display: flex;
  justify-content: flex-start;
  background-color: #202124;
  border-bottom: 1px solid #4a4545;
`;

const MximizeComponent = styled.button.attrs(() => ({
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

export default function CodeEditor({ title, language, value }) {
  return (
    <div className='h-100'>
      <EditorHeader>
        {title}
        <div className='flex-grow-1 d-flex justify-content-end'>
          <MximizeComponent>
            <FontAwesomeIcon icon='window-maximize'></FontAwesomeIcon>
          </MximizeComponent>
        </div>
      </EditorHeader>
      <Editor
        language={language}
        theme='dark'
        value={value}
        height='calc(100% - 3rem)'
      ></Editor>
    </div>
  );
}
