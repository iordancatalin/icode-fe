import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutContextProviver } from './core/contexts/LayoutContext';
import loadFontAwsoneIcons from './core/font-awsome';
import DevelopmentComponent from './features/development/DevelopmentComponent';
import HeaderComponent from './features/header/HeaderComponent';

loadFontAwsoneIcons();

const AppContainer = styled.div.attrs(() => ({
  className: 'p-2',
}))`
  min-height: 100vh;
  background-color: #343a40;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <BrowserRouter>
      <LayoutContextProviver>
        <AppContainer>
          <HeaderComponent />

          <div className='d-flex flex-grow-1'>
            <Switch>
              <Route path='/'>
                <DevelopmentComponent></DevelopmentComponent>
              </Route>
            </Switch>
          </div>
        </AppContainer>
      </LayoutContextProviver>
    </BrowserRouter>
  );
}

export default App;
