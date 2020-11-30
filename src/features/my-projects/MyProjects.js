import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { baseURL } from '../../core/constants';
import Project from '../../shared/Project';
import SearchComponent from '../../shared/SearchComponent';
import { deleteProjectByRef, getUserProjects } from './project-service';

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

const NewProject = styled.div.attrs(() => ({
  className: 'rounded',
}))`
  background-color: ${({ theme }) => theme.primary};
  height: 100%;
`;

const NewProjectButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.foreground.secondary};
  border: 0;
  width: 100%;
  height: 100%;
  font-size: 6rem;
`;

const createIFrameEndpoint = (projectRef) =>
  `${baseURL}/api/v1/execution-result/${projectRef}`;

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const loadProjects = async () => {
      const response = await getUserProjects();

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

  const handleDeleteProject = async (projectRef) => {
    const response = await deleteProjectByRef(projectRef);

    if (response.status === 200) {
      setProjects((oldProjects) =>
        oldProjects.filter((project) => project.projectRef !== projectRef)
      );
      setFilteredProjects((oldProjects) =>
        oldProjects.filter((project) => project.projectRef !== projectRef)
      );

      return;
    }

    toast.error('Oops! Something went wrong');
  };

  const handleOnProjectClick = (projectRef) =>
    history.push(`/kode/development?projectRef=${projectRef}`);

  const projectsElement = filteredProjects.map((project, index) => (
    <ProjectArea key={index}>
      <Project
        iframeURL={createIFrameEndpoint(project.projectRef)}
        name={project.name}
        projectRef={project.projectRef}
        onClick={handleOnProjectClick}
        onDelete={handleDeleteProject}
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

      <ProjectsGrid>
        <ProjectArea>
          <NewProject>
            <NewProjectButton>
              <FontAwesomeIcon icon='plus'></FontAwesomeIcon>
            </NewProjectButton>
          </NewProject>
        </ProjectArea>

        {projectsElement}
      </ProjectsGrid>
    </div>
  );
}
