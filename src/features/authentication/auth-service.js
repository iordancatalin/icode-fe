import { baseURL } from '../../core/constants';

export const createAccount = (body) =>
  fetch(`${baseURL}/api/v1/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const resendConfirmationEmail = (emailAddress) =>
  fetch(`${baseURL}/api/v1/resend-confirmation-email/${emailAddress}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const confirmEmailAddress = (token) =>
  fetch(`${baseURL}/api/v1/confirm-email/${token}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const changePassword = (token, body) =>
  fetch(`${baseURL}/api/v1/reset-password/${token}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const getCurrentAccountDetails = () => {
  const jwt = localStorage.getItem('jwt-token');
  const authorizationHeader = { authorization: `Bearer ${jwt}` };

  return fetch(`${baseURL}/api/v1/account-details`, {
    method: 'GET',
    headers: {
      ...authorizationHeader,
      'Content-Type': 'application/json',
    },
  });
};
