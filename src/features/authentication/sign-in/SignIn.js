import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../core/contexts/AuthContext';
import { AUTHENTICATE_ACTION } from '../../../core/reducers/auth-reducer';
import Loader from '../../../shared/Loader';
import { getCurrentAccountDetails, signInUser } from '../auth-service';
import {
  AuthContainer,
  AuthHeader,
  AuthMainContainer,
  AuthFooter,
  AuthInput,
  AuthFooterInfo,
  AuthButton,
  AuthError,
  AuthInputError,
} from '../Auth.components';
import { usePasswordValidator } from '../hooks/password-validator';
import { useUsernameValidator } from '../hooks/username-validator';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isAccountNotEnabled, setAccountNotEnabled] = useState(false);

  const [usernameError, usernameValidationFunc] = useUsernameValidator();
  const [passwordError, passwordValidationFunc] = usePasswordValidator();

  const [, authDispacher] = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    usernameValidationFunc(username);
    passwordValidationFunc(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChanged = (event, setter, validationFunc) => {
    const { value } = event.target;

    // eslint-disable-next-line no-unused-expressions
    validationFunc?.(value);
    setter(value);
  };

  const errorElement = errorMessage && (
    <AuthError>
      {errorMessage}
      {isAccountNotEnabled && (
        <Link className='ml-1' to='/confirm-email'>
          resend email
        </Link>
      )}
    </AuthError>
  );

  const usernameErrorElement = usernameError && username && (
    <AuthInputError>{usernameError}</AuthInputError>
  );

  const passwordErrorElement = passwordError && password && (
    <AuthInputError>{passwordError}</AuthInputError>
  );

  const loaderElement = showLoader && <Loader />;

  const isInvalid = useCallback(() => usernameError || passwordError, [
    usernameError,
    passwordError,
  ]);

  const handleSignIn = async () => {
    const response = await signInUser(username, password);

    if (response.status === 200) {
      const authorizationHeader = response.headers.get('Authorization');
      const jwt = authorizationHeader.replace('Bearer ', '');
      localStorage.setItem('jwt-token', jwt);

      const resp = await getCurrentAccountDetails();

      if (resp.status === 200) {
        const accountDetails = await resp.json();
        authDispacher({ type: AUTHENTICATE_ACTION, payload: accountDetails });
      } else {
        toast.error('Oops! Something went wrong');
        return;
      }

      setShowLoader(false);
      history.push('/kode/development');
      return;
    }

    if (response.status === 401) {
      const body = await response.json();

      const accountNotEnabled = body.errorMessage === 'User is disabled';
      const message = accountNotEnabled
        ? 'Account not enabled'
        : 'Invalid credentials';

      setErrorMessage(message);
      setAccountNotEnabled(accountNotEnabled);
      setShowLoader(false);
      return;
    }

    setErrorMessage('Oops! An error occured, try again later');
    setShowLoader(false);
  };

  return (
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
      <AuthContainer>
        <AuthHeader>Sign in</AuthHeader>
        <AuthMainContainer>
          {errorElement}

          <div className='m-2'>
            {usernameErrorElement}
            <AuthInput
              placeholder='Username'
              value={username}
              onChange={(event) =>
                handleValueChanged(event, setUsername, usernameValidationFunc)
              }
              type='text'
            ></AuthInput>
          </div>

          <div className='m-2'>
            {passwordErrorElement}
            <AuthInput
              placeholder='Password'
              value={password}
              onChange={(event) =>
                handleValueChanged(event, setPassword, passwordValidationFunc)
              }
              type='password'
            ></AuthInput>
          </div>

          <AuthButton
            className='m-3'
            onClick={handleSignIn}
            disabled={isInvalid()}
          >
            Sign in
          </AuthButton>
        </AuthMainContainer>
        <AuthFooter>
          <div>
            <AuthFooterInfo>Don't have an account?</AuthFooterInfo>
            <Link className='ml-1' to='/auth/sign-up'>
              Sign up
            </Link>
          </div>
          <div className='mt-2'>
            <AuthFooterInfo>Forgot your password?</AuthFooterInfo>
            <Link className='ml-1' to='/auth/reset-password'>
              Reset password
            </Link>
          </div>
        </AuthFooter>
      </AuthContainer>

      {loaderElement}
    </div>
  );
}
