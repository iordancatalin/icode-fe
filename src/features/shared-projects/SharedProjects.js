import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { baseURL } from '../../core/constants';
import Project from '../../shared/Project';
import SearchComponent from '../../shared/SearchComponent';
import { getProjectsSharedWithCurrentUser } from './shared-projects-service';

const ProjectArea = styled.div`
  height: 250px;
`;

const ProjectsGrid = styled.main.attrs(() => ({
  className: 'p-4',
}))`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  gap: 20px;
`;

const createIFrameEndpoint = (projectRef) =>
  `${baseURL}/api/v1/execution-result/${projectRef}`;

export default function SharedProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const loadProjects = async () => {
      const response = await getProjectsSharedWithCurrentUser();

      if (response.status === 200) {
        const body = await response.json();
        setProjects(body);
        setFilteredProjects(body);
      }
    };

    loadProjects();
  }, []);

  const handleOnSearch = (query) =>
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    );

  const handleOnProjectClick = (projectRef) =>
    history.push(`/kode/development?projectRef=${projectRef}`);

  const projectsElement = filteredProjects.map((project, index) => (
    <ProjectArea key={index}>
      <Project
        iframeURL={createIFrameEndpoint(project.projectRef)}
        name={project.name}
        projectRef={project.projectRef}
        onClick={handleOnProjectClick}
        sharedProject={true}
      ></Project>
    </ProjectArea>
  ));

  return (
    <div className='flex-grow-1'>
      <header className='p-3 d-flex justify-content-center align-items-center'>
        <SearchComponent
          onSeach={handleOnSearch}
          placeholder='Search project...'
        ></SearchComponent>
      </header>

      <ProjectsGrid>{projectsElement}</ProjectsGrid>
    </div>
  );
}
