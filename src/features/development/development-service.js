export const executeCode = (body) =>
  fetch('http://localhost:8080/api/v1/execute-code', {
    method: 'POST',
    headers: createHeadersForExecuteCodeRequest(),
    body: JSON.stringify(body),
  });

const createHeadersForExecuteCodeRequest = () => {
  const wrkDirectory = sessionStorage.getItem('x-wrk-directory');

  return wrkDirectory
    ? {
        'Content-Type': 'application/json',
        'X-WRK-DIRECTORY': wrkDirectory,
      }
    : { 'Content-Type': 'application/json' };
};
