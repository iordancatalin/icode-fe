import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutContextProviver } from './core/contexts/LayoutContext';
import loadFontAwsoneIcons from './core/font-awsome';
import AppDevelopment from './features/development/AppDevelopment';
import NavBarComponent from './features/nav-bar/NavBarComponent';

loadFontAwsoneIcons();

const AppContainer = styled.div`
  height: 100vh;
  background-color: #343a40;
  display: flex;
`;

function App() {
  return (
    <BrowserRouter>
      <LayoutContextProviver>
        <AppContainer>
          <NavBarComponent></NavBarComponent>
          <div className='d-flex flex-grow-1'>
            <Switch>
              <Route path='/'>
                <AppDevelopment/>
              </Route>
            </Switch>
          </div>
        </AppContainer>
      </LayoutContextProviver>
    </BrowserRouter>
  );
}

export default App;
