import { parse } from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ResendEmail from './ResendEmail';
import TokenValidation from './TokenValidation';

export default function ConfirmEmail() {
  const location = useLocation();
  const { token } = parse(location?.search);

  const page = token ? <TokenValidation token={token} /> : <ResendEmail />;

  return page;
}
