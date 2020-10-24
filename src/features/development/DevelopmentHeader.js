import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import GridAreaComponent from '../../shared/GridAreaComponent';
import LayoutSelectorComponent from './LayoutSelectorComponent';

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'file-details user-area'
    'layout-selection layout-selection';

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 'file-details layout-selection user-area';
  }
`;

const FileDetails = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'icon name'
    'icon author';
`;

const FileIcon = styled.div`
  color: #fff;

  grid-area: icon;
  align-self: center;
  justify-self: center;
`;

const FileNameArea = styled.div`
  grid-area: name;
  align-self: end;
`;

const FileNameInput = styled.input.attrs(() => ({
  className: 'pt-1 px-2 text-white font-montserrat',
}))`
  border: 0;
  outline: none;
  border: 1px solid;
  border-color: transparent;
  background-color: transparent;

  &:focus {
    border-color: #fff;
  }
`;

const AuthorArea = styled.div.attrs(() => ({
  className: 'px-2 font-montserrat',
}))`
  grid-area: author;
  font-size: 12px;

  span {
    color: #9d9d9d;
  }
`;

const SaveButton = styled.button.attrs(() => ({
  className: 'mr-1',
}))`
  outline: none;
  border: 0;
  background-color: #dd5c71;
  color: #fff;
  max-height: 50px;
  padding: 0.5rem 2rem;
  border-radius: 2px;

  &:focus {
    outline: none;
  }
`;

export default function DevelopmentHeader() {
  const [fileName, setFileName] = useState(`Untitled`);

  return (
    <Header>
      <GridAreaComponent areaName='file-details'>
        <FileDetails>
          <FileIcon>
            <FontAwesomeIcon icon='file-alt' size='2x'></FontAwesomeIcon>
          </FileIcon>
          <FileNameArea>
            <FileNameInput
              type='text'
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
            ></FileNameInput>
          </FileNameArea>
          <AuthorArea>
            <span>by</span> <span className='text-white'>Anonymous Joker</span>
          </AuthorArea>
        </FileDetails>
      </GridAreaComponent>
      <GridAreaComponent
        areaName='layout-selection'
        className='d-flex flex-grow-1 justify-content-center p-2'
      >
        <LayoutSelectorComponent />
      </GridAreaComponent>
      <GridAreaComponent
        areaName='user-area'
        className='flex-grow-1 p-2 align-self-center justify-self-end'
      >
        <SaveButton>
          <span>Save</span>
        </SaveButton>
      </GridAreaComponent>
    </Header>
  );
}
