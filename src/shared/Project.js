import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const ProjectContainer = styled.div.attrs(() => ({
  className: 'rounded',
}))`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.projectBck};
`;

const ProjectIFrame = styled.iframe`
  height: 70%;
  width: 100%;
  overflow: hidden;
  border: 0;
  background-color: #fff;
`;

const ProjectHeader = styled.button.attrs(() => ({
  className: 'rounded-top',
}))`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.foreground.secondary};

  &:hover {
    border: 1px solid ${({ theme }) => theme.foreground.secondary};
  }
`;

const ProjectOptionButton = styled.button.attrs(() => ({
  className: 'p-1',
}))`
  width: 50%;
  border: 1px solid ${({ theme }) => theme.foreground.secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.foreground.secondary};

  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.foreground.secondary};
    color: ${({ theme }) => theme.accent};
  }
`;

export default function Project({
  iframeURL,
  name,
  projectRef,
  onClick,
  onDelete,
  onShare,
}) {
  return (
    <ProjectContainer>
      <ProjectHeader onClick={() => onClick(projectRef)}>{name}</ProjectHeader>
      <ProjectIFrame src={iframeURL} title='Project'></ProjectIFrame>

      <div className='d-flex'>
        <ProjectOptionButton
          onClick={onShare}
          style={{ borderBottomLeftRadius: '.25rem' }}
        >
          <FontAwesomeIcon icon='share-alt'></FontAwesomeIcon>
        </ProjectOptionButton>

        <ProjectOptionButton
          onClick={() => onDelete(projectRef)}
          style={{ borderBottomRightRadius: '.25rem' }}
        >
          <FontAwesomeIcon icon='trash'></FontAwesomeIcon>
        </ProjectOptionButton>
      </div>
    </ProjectContainer>
  );
}
