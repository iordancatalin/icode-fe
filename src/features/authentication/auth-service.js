const baseURL = 'http://localhost:8080';

export const createAccount = (body) =>
  fetch(`${baseURL}/api/v1/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });