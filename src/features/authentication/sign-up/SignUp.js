import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AuthContainer,
  AuthHeader,
  AuthMainContainer,
  AuthFooter,
  AuthInput,
  AuthFooterInfo,
  AuthButton,
  AuthErrorr,
} from '../Auth.components';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState();

  const errorElement = errorMessage && <AuthErrorr>{errorMessage}</AuthErrorr>;

  return (
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
      <AuthContainer>
        <AuthHeader>Sign up</AuthHeader>
        <AuthMainContainer>
          {errorElement}
          <AuthInput
            className='m-2'
            placeholder='Username'
            type='text'
          ></AuthInput>
          <AuthInput
            className='m-2'
            placeholder='Email address'
            type='email'
          ></AuthInput>
          <AuthInput
            className='m-2'
            placeholder='Password'
            type='password'
          ></AuthInput>
          <AuthInput
            className='m-2'
            placeholder='Confirm password'
            type='password'
          ></AuthInput>

          <AuthButton className='m-3'>Sign up</AuthButton>
        </AuthMainContainer>
        <AuthFooter>
          <div>
            <AuthFooterInfo>Already have an account?</AuthFooterInfo>
            <Link className='ml-1' to='/sign-in'>
              Sign in
            </Link>
          </div>
          <div className='mt-2'>
            <AuthFooterInfo>Forgot your password?</AuthFooterInfo>
            <Link className='ml-1' to='/request-reset-password'>
              Reset
            </Link>
          </div>
        </AuthFooter>
      </AuthContainer>
    </div>
  );
}
