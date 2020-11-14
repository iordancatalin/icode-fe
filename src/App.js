import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import AuthContextProvider from './core/contexts/AuthContext';
import { ThemeStoreProvider } from './core/contexts/ThemeStoreContext';
import loadFontAwsoneIcons from './core/font-awsome';
import ConfirmEmail from './features/authentication/confirm-email/ConfirmEmail';
import SignUp from './features/authentication/sign-up/SignUp';
import AppDevelopment from './features/development/AppDevelopment';
import NavBarComponent from './features/nav-bar/NavBarComponent';
import 'react-toastify/dist/ReactToastify.css';

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
              <Route path='/sign-up'>
                <SignUp />
              </Route>

              <Route path='/confirm-email'>
                <ConfirmEmail />
              </Route>

              <Route path='/' exact={true}>
                <NavBarComponent></NavBarComponent>
                <DivFlex>
                  <AppDevelopment />
                </DivFlex>
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
