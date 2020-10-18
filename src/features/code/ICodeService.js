export const executeCode = (body) =>
  fetch('http://localhost:8080/api/v1/execute-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
