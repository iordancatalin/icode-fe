import { parse } from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import NewPassword from './NewPassword';
import RequestResetPassword from './RequestResetPassword';

export default function ResetPassword() {
  const location = useLocation();
  const { token } = parse(location?.search);

  const page = token ? <NewPassword token={token} /> : <RequestResetPassword />;

  return page;
}
