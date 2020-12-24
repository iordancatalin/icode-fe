import { parse } from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  CSS_CONFIG,
  HTML_CONFIG,
  JS_CONFIG,
  X_WRK_DIRECTORY,
} from '../../core/constants';
import { LayoutContextProviver } from './contexts/LayoutContext';
import { loadByProjectRef, saveProject } from './development-service';
import DevelopmentComponent from './DevelopmentComponent';
import DevelopmentHeader from './DevelopmentHeader';

const AppDevelopmentContainer = styled.div.attrs(() => ({
  className: 'p-2',
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function AppDevelopment() {
  const [project, setProject] = useState();
  const [projectName, setProjectName] = useState('Untitled');

  const location = useLocation();

  const htmlValueRef = useRef(HTML_CONFIG.sample);
  const cssValueRef = useRef(CSS_CONFIG.sample);
  const jsValueRef = useRef(JS_CONFIG.sample);

  useEffect(() => {
    const loadProject = async (projectRef) => {
      const response = await loadByProjectRef(projectRef);

      if (response.status === 200) {
        const body = await response.json();
        htmlValueRef.current = body.html;
        cssValueRef.current = body.css;
        jsValueRef.current = body.js;
        setProject(body);
        setProjectName(body.name);
      }
    };

    const { projectRef } = parse(location?.search);

    if (projectRef) {
      loadProject(projectRef);
    }
  }, [location]);

  const handleSave = async (projectName) => {
    const body = {
      projectName,
      projectRef: sessionStorage.getItem(X_WRK_DIRECTORY),
      html: htmlValueRef.current,
      css: cssValueRef.current,
      js: jsValueRef.current,
    };
    const response = await saveProject(body);

    if (response.status === 200) {
      toast.success('Project saved with success', {
        position: 'bottom-center',
      });
      return;
    }

    toast.error('Oops! Something went wrong', {
      position: 'bottom-center',
    });
  };

  const handleNameChanged = (newName) => setProjectName(newName);

  return (
    <LayoutContextProviver>
      <AppDevelopmentContainer>
        <DevelopmentHeader
          onSave={handleSave}
          projectName={projectName}
          onNameChanged={handleNameChanged}
        />
        <DevelopmentComponent
          project={project}
          htmlValueRef={htmlValueRef}
          cssValueRef={cssValueRef}
          jsValueRef={jsValueRef}
        />
      </AppDevelopmentContainer>
    </LayoutContextProviver>
  );
}
