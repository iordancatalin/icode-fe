import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../core/contexts/AuthContext';
import { AUTHENTICATE_STATUS } from '../../core/reducers/auth-reducer';
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
  color: ${({ theme }) => theme.foreground.secondary};

  grid-area: icon;
  align-self: center;
  justify-self: center;
`;

const FileNameArea = styled.div`
  grid-area: name;
  align-self: end;
`;

const FileNameInput = styled.input.attrs(() => ({
  className: 'pt-1 px-2 font-montserrat',
}))`
  color: ${({ theme }) => theme.foreground.secondary};
  border: 0;
  outline: none;
  border: 1px solid;
  border-color: transparent;
  background-color: transparent;

  &:focus {
    border-color: ${({ theme }) => theme.foreground.secondary};
  }
`;

const AuthorArea = styled.div.attrs(() => ({
  className: 'px-2 font-montserrat',
}))`
  grid-area: author;
  font-size: 12px;
`;

const ByComponent = styled.span`
  color: #9d9d9d;
`;

const AuthorName = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.foreground.secondary};
`;

const SaveButton = styled.button.attrs(() => ({
  className: 'mr-1',
}))`
  outline: none;
  border: 0;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.foreground.primary};
  max-height: 50px;
  padding: 0.5rem 2rem;
  border-radius: 2px;

  &:focus {
    outline: none;
  }

  &:disabled {
    filter: brightness(135%);
  }
`;

export default function DevelopmentHeader({
  onSave,
  projectName,
  onNameChanged,
}) {
  const [authState] = useContext(AuthContext);

  const userLogger = authState?.status === AUTHENTICATE_STATUS;
  const author = authState?.status === AUTHENTICATE_STATUS ? authState.username : 'Anonymous';

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
              value={projectName}
              onChange={(event) => onNameChanged(event.target.value)}
            ></FileNameInput>
          </FileNameArea>
          <AuthorArea>
            <ByComponent>by</ByComponent>
            <AuthorName>{author}</AuthorName>
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
        <SaveButton onClick={() => onSave(projectName)} disabled={!userLogger}>
          <span>Save</span>
        </SaveButton>
      </GridAreaComponent>
    </Header>
  );
}
