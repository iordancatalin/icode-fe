import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import AuthContextProvider from './core/contexts/AuthContext';
import { ThemeStoreProvider } from './core/contexts/ThemeStoreContext';
import loadFontAwsoneIcons from './core/font-awsome';
import AppDevelopment from './features/development/AppDevelopment';
import NavBarComponent from './features/nav-bar/NavBarComponent';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './features/authentication/Authentication';
import NotFoundPage from './features/not-found/NotFoundPage';
import MyProjects from './features/my-projects/MyProjects';
import SharedProjects from './features/shared-projects/SharedProjects';
import Settings from './features/settings/Settings';

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
        <AuthContextProvider>
          <AppContainer>
            <Switch>
              <Route path='/auth'>
                <Authentication />
              </Route>

              <Route path='/kode'>
                <NavBarComponent></NavBarComponent>
                <DivFlex>
                  <Route path='/kode/development'>
                    <AppDevelopment />
                  </Route>

                  <Route path='/kode/my-projects'>
                    <MyProjects></MyProjects>
                  </Route>

                  <Route path='/kode/shared-projects'>
                    <SharedProjects></SharedProjects>
                  </Route>

                  <Route path='/kode/settings'>
                    <Settings></Settings>
                  </Route>
                </DivFlex>
              </Route>

              <Route path='/' exact={true}>
                <Redirect to='/kode/development'></Redirect>
              </Route>

              <Route>
                <NotFoundPage></NotFoundPage>
              </Route>
            </Switch>

            <ToastContainer
              hideProgressBar={true}
              bodyClassName='font-montserrate text-center'
            ></ToastContainer>
          </AppContainer>
        </AuthContextProvider>
      </ThemeStoreProvider>
    </BrowserRouter>
  );
}

export default App;
