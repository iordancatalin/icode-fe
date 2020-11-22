import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../../shared/Loader';
import { requestResetPassword } from '../../../core/services/auth-service';
import {
  AuthContainer,
  AuthHeader,
  AuthMainContainer,
  AuthInput,
  AuthButton,
  AuthInputError,
} from '../Auth.components';
import { useEmailValidator } from '../hooks/email-validator';

export default function RequestResetPassword() {
  const [email, setEmail] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const [emailErrorMessage, emailValidationFunc] = useEmailValidator();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => emailValidationFunc(email), []);

  const emailErrorElement = emailErrorMessage && email && (
    <AuthInputError>{emailErrorMessage}</AuthInputError>
  );

  const loaderElement = showLoader && <Loader />;

  const handleValueChanged = (event, setter, validationFunc) => {
    const { value } = event.target;

    // eslint-disable-next-line no-unused-expressions
    validationFunc?.(value);
    setter(value);
  };

  const handleResetPassword = async () => {
    setShowLoader(true);

    const body = { input: email };
    const response = await requestResetPassword(body);

    setShowLoader(false);

    if (response.status === 200) {
      toast.success('An email with instructions was send');
      return;
    }

    toast.erro('Something went wrong');
  };

  const isInvalid = useCallback(() => emailErrorMessage, [emailErrorMessage]);

  return (
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
      <AuthContainer>
        <AuthHeader>Reset password</AuthHeader>
        <AuthMainContainer>
          <div className='m-2'>
            {emailErrorElement}
            <AuthInput
              placeholder='Email'
              value={email}
              onChange={(event) =>
                handleValueChanged(event, setEmail, emailValidationFunc)
              }
              type='email'
            ></AuthInput>
          </div>

          <AuthButton
            className='m-3'
            onClick={handleResetPassword}
            disabled={isInvalid()}
          >
            Reset
          </AuthButton>
        </AuthMainContainer>
      </AuthContainer>

      {loaderElement}
    </div>
  );
}
