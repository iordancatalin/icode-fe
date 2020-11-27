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

const ProjectIFrame = styled.iframe.attrs(() => ({
  className: 'rounded-top',
}))`
  height: 80%;
  width: 100%;
  overflow: hidden;
  border: 0;
  background-color: #fff;
`;

const ProjectFooter = styled.button.attrs(() => ({
  className: 'rounded-bottom',
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

export default function Project({ iframeURL, name, projectRef, onClick }) {
  return (
    <ProjectContainer>
      <ProjectIFrame src={iframeURL} title='Project'></ProjectIFrame>
      <ProjectFooter onClick={(event) => onClick(projectRef)}>
        {name}
      </ProjectFooter>
    </ProjectContainer>
  );
}
