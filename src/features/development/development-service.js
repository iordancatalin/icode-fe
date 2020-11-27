import { baseURL, X_WRK_DIRECTORY } from '../../core/constants';

export const executeCode = (body) =>
  fetch(`${baseURL}/api/v1/execute-code`, {
    method: 'POST',
    headers: createHeadersForExecuteCodeRequest(),
    body: JSON.stringify(body),
  });

const createHeadersForExecuteCodeRequest = () => {
  const wrkDirectory = sessionStorage.getItem(X_WRK_DIRECTORY);

  return wrkDirectory
    ? {
        'Content-Type': 'application/json',
        'X-WRK-DIRECTORY': wrkDirectory,
      }
    : { 'Content-Type': 'application/json' };
};
