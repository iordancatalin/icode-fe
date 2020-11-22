import React, { useContext, useState } from 'react';
import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

import { createAccount } from '../../../core/services/auth-service';
import { useUsernameValidator } from '../hooks/username-validator';
import { useEmailValidator } from '../hooks/email-validator';
import { usePasswordValidator } from '../hooks/password-validator';
import { useEffect } from 'react';
import Loader from '../../../shared/Loader';
import { AuthContext } from '../../../core/contexts/AuthContext';
import { REGISTER_ACTION } from '../../../core/reducers/auth-reducer';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [usernameError, usernameValidationFunc] = useUsernameValidator();
  const [emailError, emailValidationFunc] = useEmailValidator();
  const [passwordError, passwordValidationFunc] = usePasswordValidator();
  const [
    confirmPasswordError,
    confirmPasswordValidationFunc,
  ] = usePasswordValidator();

  const [showLoader, setShowLoader] = useState(false);

  const [, authDispacher] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    usernameValidationFunc(username);
    emailValidationFunc(email);
    passwordValidationFunc(password);
    confirmPasswordValidationFunc(confirmPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validation = useCallback(() => {
    if (password !== confirmPassword) {
      throw Error('Passwords do not match');
    }
  }, [password, confirmPassword]);

  const sigUp = useCallback(async () => {
    const validateResponse = (response) => {
      const { status } = response;

      if (status === 400) {
        throw new Error('Email or username already exists');
      }

      if (status > 400) {
        throw new Error('An error occured, try again later!');
      }
    };

    setShowLoader(true);
    const body = { username, email, password };
    const response = await createAccount(body);

    try {
      validateResponse(response);

      const responseBody = await response.json();
      authDispacher({ type: REGISTER_ACTION, payload: responseBody });

      setShowLoader(false);
      history.push('/auth/confirm-email');
    } catch (error) {
      setShowLoader(false);
      setErrorMessage(error.message);
    }
  }, [username, email, password, history, authDispacher]);

  const handleValueChanged = (event, setter, validationFunc) => {
    const { value } = event.target;

    // eslint-disable-next-line no-unused-expressions
    validationFunc?.(value);
    setter(value);
  };

  const errorElement = errorMessage && <AuthError>{errorMessage}</AuthError>;

  const usernameErrorElement = usernameError && username && (
    <AuthInputError>{usernameError}</AuthInputError>
  );

  const emailErrorElement = emailError && email && (
    <AuthInputError>{emailError}</AuthInputError>
  );

  const passwordErrorElement = passwordError && password && (
    <AuthInputError>{passwordError}</AuthInputError>
  );

  const confirmPasswordErrorElement = confirmPasswordError &&
    confirmPassword && <AuthInputError>{confirmPasswordError}</AuthInputError>;

  const loaderElement = showLoader && <Loader />;

  const handleSignUp = () => {
    try {
      validation();
      sigUp();
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const isInvalid = useCallback(
    () => usernameError || emailError || passwordError || confirmPasswordError,
    [usernameError, emailError, passwordError, confirmPasswordError]
  );

  return (
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
      <AuthContainer>
        <AuthHeader>Sign up</AuthHeader>
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
            {emailErrorElement}
            <AuthInput
              placeholder='Email address'
              value={email}
              onChange={(event) =>
                handleValueChanged(event, setEmail, emailValidationFunc)
              }
              type='email'
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

          <div className='m-2'>
            {confirmPasswordErrorElement}
            <AuthInput
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(event) =>
                handleValueChanged(
                  event,
                  setConfirmPassword,
                  confirmPasswordValidationFunc
                )
              }
              type='password'
            ></AuthInput>
          </div>

          <AuthButton
            className='m-3'
            onClick={handleSignUp}
            disabled={isInvalid()}
          >
            Sign up
          </AuthButton>
        </AuthMainContainer>
        <AuthFooter>
          <div>
            <AuthFooterInfo>Already have an account?</AuthFooterInfo>
            <Link className='ml-1' to='/auth/sign-in'>
              Sign in
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
