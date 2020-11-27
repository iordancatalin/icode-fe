import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  CSS_CONFIG,
  HTML_CONFIG,
  JS_CONFIG,
  LAYOUT_TYPE_1,
  LAYOUT_TYPE_2,
  X_WRK_DIRECTORY,
} from '../../core/constants';
import GridAreaComponent from '../../shared/GridAreaComponent';
import LayoutComponent from '../../shared/LayoutComponent';
import CodeEditorComponent from './CodeEditorComponent';
import { LayoutContext } from './contexts/LayoutContext';
import { executeCode } from './development-service';

const GRID_GAP = 10;

const ICodeLayoutComponent = styled(LayoutComponent).attrs(() => ({
  className: 'pl-1',
}))`
  max-width: calc(100vw - 6rem);
  max-height: calc(100vh - 5rem);
  width: auto;
  height: auto;
  display: grid;
  gap: ${GRID_GAP}px;
  flex: 1;
  padding-top: 5px;
`;

const OuputContainer = styled.div.attrs(() => ({
  className: 'd-flex h-100 w-100 justify-content-center align-items-center',
}))`
  color: ${({ theme }) => theme.disabled};
  background-color: ${({ theme }) => theme.outputBck};
`;

const ExternalLinkContainer = styled.div.attrs(() => ({
  className: 'posibition-absolute rounded-circle',
}))`
  right: 10px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0.2);

  a {
    width: 50px;
    height: 50px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    a {
      color: #fff;
    }
    background-color: #000;
  }
`;

export default function DevelopmentComponent({
  project,
  htmlValueRef,
  cssValueRef,
  jsValueRef,
}) {
  const [outputEndpoint, setOutputEndpoint] = useState();
  const [editorDimension, setEditorDimension] = useState();
  const [layout] = useContext(LayoutContext);

  const themeContext = useContext(ThemeContext);

  const layoutContainerRef = useRef();
  const timeoutId = useRef();
  const iframeRef = useRef();

  useEffect(() => {
    if (project) {
      sessionStorage.setItem(X_WRK_DIRECTORY, project.projectRef);
    } else {
      sessionStorage.clear();
    }
  }, [project]);

  const createRequestBody = useCallback(
    () => ({
      html: htmlValueRef.current,
      css: cssValueRef.current,
      js: jsValueRef.current,
    }),
    [cssValueRef, htmlValueRef, jsValueRef]
  );

  const handleExecution = useCallback(async () => {
    const requestBody = createRequestBody();
    const response = await executeCode(requestBody);
    const responseBody = await response.json();

    if (responseBody?.endpoint) {
      const timestamp = Date.now();
      setOutputEndpoint(`${responseBody.endpoint}?timestamp=${timestamp}`);
    }

    if (responseBody?.workingDirectory) {
      sessionStorage.setItem(X_WRK_DIRECTORY, responseBody.workingDirectory);
    }
  }, [createRequestBody]);

  const contentElement = outputEndpoint ? (
    <div className='h-100 position-relative'>
      <iframe
        className='h-100 w-100 border-0 bg-white'
        src={outputEndpoint}
        title='Execution result'
        ref={iframeRef}
      ></iframe>

      <ExternalLinkContainer className='position-absolute'>
        <a href={outputEndpoint} target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon='external-link-alt'></FontAwesomeIcon>
        </a>
      </ExternalLinkContainer>
    </div>
  ) : (
    <OuputContainer>No content to show here for the moment.</OuputContainer>
  );

  const calculateEditorDimension = useCallback(
    (layoutWidth, layoutHeight) => {
      if (layout === LAYOUT_TYPE_1 || layout === LAYOUT_TYPE_2) {
        const editorWidth = (layoutWidth - 2 * GRID_GAP) / 3;
        const editorHeight = (layoutHeight - GRID_GAP) / 2;

        return { width: editorWidth, height: editorHeight };
      }

      const editorWidth = (layoutWidth - GRID_GAP) / 2;
      const editorHeight = (layoutHeight - 2 * GRID_GAP) / 3;

      return { width: editorWidth, height: editorHeight };
    },
    [layout]
  );

  const resetEditorDimension = useCallback(() => {
    if (layoutContainerRef.current) {
      const {
        width,
        height,
      } = layoutContainerRef.current.getBoundingClientRect();

      const newDimension = calculateEditorDimension(width, height);
      setEditorDimension(newDimension);
    }
  }, [calculateEditorDimension]);

  const handleWindowResize = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => resetEditorDimension(), 100);
  }, [resetEditorDimension]);

  useEffect(() => {
    resetEditorDimension();
    window.onresize = handleWindowResize;
  }, [layout, handleWindowResize, resetEditorDimension]);

  useEffect(() => {
    handleExecution();
  }, [handleExecution, project]);

  return (
    <ICodeLayoutComponent layoutType={layout} ref={layoutContainerRef}>
      <GridAreaComponent areaName='html'>
        <CodeEditorComponent
          title={HTML_CONFIG.editorTitle}
          language={HTML_CONFIG.language}
          valueRef={htmlValueRef}
          onExecution={handleExecution}
          dimension={editorDimension}
          theme={themeContext.monacoTheme}
        ></CodeEditorComponent>
      </GridAreaComponent>
      <GridAreaComponent areaName='css'>
        <CodeEditorComponent
          title={CSS_CONFIG.editorTitle}
          language={CSS_CONFIG.language}
          valueRef={cssValueRef}
          onExecution={handleExecution}
          dimension={editorDimension}
          theme={themeContext.monacoTheme}
        ></CodeEditorComponent>
      </GridAreaComponent>
      <GridAreaComponent areaName='js'>
        <CodeEditorComponent
          title={JS_CONFIG.editorTitle}
          language={JS_CONFIG.language}
          valueRef={jsValueRef}
          onExecution={handleExecution}
          dimension={editorDimension}
          theme={themeContext.monacoTheme}
        ></CodeEditorComponent>
      </GridAreaComponent>
      <GridAreaComponent areaName='output'>{contentElement}</GridAreaComponent>
    </ICodeLayoutComponent>
  );
}
