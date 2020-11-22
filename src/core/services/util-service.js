export const getCommonHeaders = () => {
  const jwt = localStorage.getItem('jwt-token');
  const authorizationHeader = jwt ? { authorization: `Bearer ${jwt}` } : {};

  return {
    'Content-Type': 'application/json',
    ...authorizationHeader,
  };
};
