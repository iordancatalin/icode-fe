import { baseURL } from '../../core/constants';
import { getCommonHeaders } from '../../core/services/util-service';

export const getProjectsSharedWithCurrentUser = () =>
  fetch(`${baseURL}/api/v1/projects/shared-with-me`, {
    headers: getCommonHeaders(),
  });
