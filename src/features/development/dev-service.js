import { baseURL } from '../../core/constants';
import { getCommonHeaders } from '../../core/services/util-service';

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
