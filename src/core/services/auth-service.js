import { baseURL } from '../constants';
import { getCommonHeaders } from './util-service';

export const createAccount = (body) =>
  fetch(`${baseURL}/api/v1/sign-up`, {
    method: 'POST',
    headers: getCommonHeaders(),
    body: JSON.stringify(body),
  });

export const resendConfirmationEmail = (emailAddress) =>
  fetch(`${baseURL}/api/v1/resend-confirmation-email/${emailAddress}`, {
    method: 'PUT',
    headers: getCommonHeaders(),
  });

export const confirmEmailAddress = (token) =>
  fetch(`${baseURL}/api/v1/confirm-email/${token}`, {
    method: 'PUT',
    headers: getCommonHeaders(),
  });

export const signInUser = (username, password) => {
  const encodedUsername = btoa(username);
  const encodedPassword = btoa(password);
  const authorizationValue = `${encodedUsername}.${encodedPassword}`;

  return fetch(`${baseURL}/api/v1/sign-in`, {
    method: 'POST',
    headers: {
      Authorization: authorizationValue,
      'Content-Type': 'application/json',
    },
  });
};

export const requestResetPassword = (body) =>
  fetch(`${baseURL}/api/v1/request-reset-password`, {
    method: 'POST',
    headers: getCommonHeaders(),
    body: JSON.stringify(body),
  });

export const changePassword = (token, body) =>
  fetch(`${baseURL}/api/v1/reset-password/${token}`, {
    method: 'PUT',
    headers: getCommonHeaders(),
    body: JSON.stringify(body),
  });

export const getCurrentAccountDetails = () =>
  fetch(`${baseURL}/api/v1/account-details`, {
    method: 'GET',
    headers: getCommonHeaders(),
  });

export const signOut = () =>
  fetch(`${baseURL}/api/v1/sign-out`, {
    method: 'POST',
    headers: getCommonHeaders(),
  });
