import { baseURL, X_WRK_DIRECTORY } from '../../core/constants';
import { getCommonHeaders } from '../../core/services/util-service';

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

export const saveProject = (body) =>
  fetch(`${baseURL}/api/v1/project/save-or-update`, {
    method: 'POST',
    headers: getCommonHeaders(),
    body: JSON.stringify(body),
  });

export const loadByProjectRef = (projectRef) =>
  fetch(`${baseURL}/api/v1/project/${projectRef}`, {
    method: 'GET',
    headers: getCommonHeaders(),
  });
