import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { changePassword } from '../../../core/services/auth-service';
import {
  AuthContainer,
  AuthHeader,
  AuthMainContainer,
  AuthInput,
  AuthButton,
  AuthInputError,
  AuthError,
} from '../Auth.components';
import { usePasswordValidator } from '../hooks/password-validator';

export default function NewPassword({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [newPasswordError, newPasswordValidationFunc] = usePasswordValidator();
  const [
    confirmNewPasswordError,
    confirmNewPasswordValidationFunc,
  ] = usePasswordValidator();

  useEffect(() => {
    newPasswordValidationFunc(newPassword);
    confirmNewPasswordValidationFunc(confirmNewPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChanged = (event, setter, validationFunc) => {
    const { value } = event.target;

    // eslint-disable-next-line no-unused-expressions
    validationFunc?.(value);
    setter(value);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage(`Passwords don't match`);
      return;
    }

    const response = await changePassword(token, { newPassword });

    if (response.status === 200) {
      toast.success('Password changed with success');
      return;
    }

    if (response.status === 400) {
      toast.error('Token invalid or expired');
      return;
    }

    toast.error('Ooops! Something went wrong');
  };

  const isInvalid = useCallback(
    () => newPasswordError && confirmNewPasswordError,
    [newPasswordError, confirmNewPasswordError]
  );

  const newPasswordErrorElement = newPasswordError && newPassword && (
    <AuthInputError>{newPasswordError}</AuthInputError>
  );

  const confirmNewPasswordErrorElement = confirmNewPasswordError &&
    confirmNewPassword && (
      <AuthInputError>{confirmNewPasswordError}</AuthInputError>
    );

  const errorElement = errorMessage && <AuthError>{errorMessage}</AuthError>;

  return (
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
      <AuthContainer>
        <AuthHeader>Change password</AuthHeader>
        <AuthMainContainer>
          {errorElement}

          <div className='m-2'>
            {newPasswordErrorElement}
            <AuthInput
              placeholder='New password'
              value={newPassword}
              onChange={(event) =>
                handleValueChanged(
                  event,
                  setNewPassword,
                  newPasswordValidationFunc
                )
              }
              type='password'
            ></AuthInput>
          </div>

          <div className='m-2'>
            {confirmNewPasswordErrorElement}
            <AuthInput
              placeholder='Confirm new password'
              value={confirmNewPassword}
              onChange={(event) =>
                handleValueChanged(
                  event,
                  setConfirmNewPassword,
                  confirmNewPasswordValidationFunc
                )
              }
              type='password'
            ></AuthInput>
          </div>

          <AuthButton
            className='m-3'
            onClick={handleChangePassword}
            disabled={isInvalid()}
          >
            Change
          </AuthButton>
        </AuthMainContainer>
      </AuthContainer>

      {/* {loaderElement} */}
    </div>
  );
}
