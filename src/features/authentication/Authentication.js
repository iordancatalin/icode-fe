import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmEmail from './confirm-email/ConfirmEmail';
import ResetPassword from './reset-password/ResetPassword';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';

const AuthenticationContainer = styled.div`
  display: flex;
  flex: 1;
`;

export default function Authentication() {
  const { path } = useRouteMatch();

  return (
    <AuthenticationContainer>
      <Route path={`${path}/sign-in`}>
        <SignIn />
      </Route>

      <Route path={`${path}/sign-up`}>
        <SignUp />
      </Route>

      <Route path={`${path}/confirm-email`}>
        <ConfirmEmail />
      </Route>

      <Route path={`${path}/reset-password`}>
        <ResetPassword />
      </Route>
    </AuthenticationContainer>
  );
}
