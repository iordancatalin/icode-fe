import { baseURL } from '../../core/constants';
import { getCommonHeaders } from '../../core/services/util-service';

export const getUserProjects = () =>
  fetch(`${baseURL}/api/v1/projects`, {
    method: 'GET',
    headers: getCommonHeaders(),
  });
