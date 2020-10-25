import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeStoreProvider } from './core/contexts/ThemeStoreContext';
import loadFontAwsoneIcons from './core/font-awsome';
import AppDevelopment from './features/development/AppDevelopment';
import NavBarComponent from './features/nav-bar/NavBarComponent';

loadFontAwsoneIcons();

const AppContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  overflow: hidden;
`;

const DivFlex = styled.div`
  display: flex;
  flex: 1;
`;

function App() {
  return (
    <BrowserRouter>
      <ThemeStoreProvider>
        <AppContainer>
          <NavBarComponent></NavBarComponent>
          <DivFlex>
            <Switch>
              <Route path='/'>
                <AppDevelopment />
              </Route>
            </Switch>
          </DivFlex>
        </AppContainer>
      </ThemeStoreProvider>
    </BrowserRouter>
  );
}

export default App;
