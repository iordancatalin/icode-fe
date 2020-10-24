import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import {
  CSS_CONFIG,
  HTML_CONFIG,
  JS_CONFIG,
  LAYOUT_TYPE_1,
  LAYOUT_TYPE_2,
} from '../../core/constants';
import { LayoutContext } from '../../core/contexts/LayoutContext';
import CodeEditorComponent from '../../shared/CodeEditorComponent';
import GridAreaComponent from '../../shared/GridAreaComponent';
import LayoutComponent from '../../shared/LayoutComponent';
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

export default function DevelopmentComponent() {
  const [outputEndpoint, setOutputEndpoint] = useState();
  const [editorDimension, setEditorDimension] = useState();
  const [layout] = useContext(LayoutContext);

  const htmlValueRef = useRef(HTML_CONFIG.sample);
  const cssValueRef = useRef(CSS_CONFIG.sample);
  const jsValueRef = useRef(JS_CONFIG.sample);

  const layoutContainerRef = useRef();
  const timeoutId = useRef();
  const iframeRef = useRef();

  const createRequestBody = () => ({
    html: htmlValueRef.current,
    css: cssValueRef.current,
    js: jsValueRef.current,
  });

  const handleExecution = useCallback(async () => {
    const requestBody = createRequestBody();
    const response = await executeCode(requestBody);
    const responseBody = await response.json();

    if (responseBody?.endpoint) {
      const timestamp = Date.now();
      setOutputEndpoint(`${responseBody.endpoint}?timestamp=${timestamp}`);
    }

    if (responseBody?.workingDirectory) {
      sessionStorage.setItem('x-wrk-directory', responseBody.workingDirectory);
    }
  }, []);

  const contentElement = outputEndpoint ? (
    <iframe
      className='h-100 w-100 border-0 bg-white'
      src={outputEndpoint}
      title='Execution result'
      ref={iframeRef}
    ></iframe>
  ) : (
    <div className='d-flex h-100 w-100 justify-content-center align-items-center text-secondary bkg-secondary'>
      No content to show here for the moment.
    </div>
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
  }, [handleExecution]);

  return (
    <ICodeLayoutComponent layoutType={layout} ref={layoutContainerRef}>
      <GridAreaComponent areaName='html'>
        <CodeEditorComponent
          title={HTML_CONFIG.editorTitle}
          language={HTML_CONFIG.language}
          valueRef={htmlValueRef}
          onExecution={handleExecution}
          dimension={editorDimension}
        ></CodeEditorComponent>
      </GridAreaComponent>
      <GridAreaComponent areaName='css'>
        <CodeEditorComponent
          title={CSS_CONFIG.editorTitle}
          language={CSS_CONFIG.language}
          valueRef={cssValueRef}
          onExecution={handleExecution}
          dimension={editorDimension}
        ></CodeEditorComponent>
      </GridAreaComponent>
      <GridAreaComponent areaName='js'>
        <CodeEditorComponent
          title={JS_CONFIG.editorTitle}
          language={JS_CONFIG.language}
          valueRef={jsValueRef}
          onExecution={handleExecution}
          dimension={editorDimension}
        ></CodeEditorComponent>
      </GridAreaComponent>
      <GridAreaComponent areaName='output'>{contentElement}</GridAreaComponent>
    </ICodeLayoutComponent>
  );
}
