import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const InternalLink = styled(Link).attrs(() => ({
  className: 'p-3',
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-left: 6px solid transparent;

  &:hover {
    color: #fff;
  }

  ${({ activelink }) =>
    activelink &&
    css`
      color: #dd5c71;
      border-color: #dd5c71;

      &:hover {
        color: #dd5c71;
      }
    `}
`;

const DisabledLink = styled.div.attrs(() => ({
  className: 'p-3 text-secondary',
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 6px solid transparent;
`;

export default function NavBarLink({ to, children, className, disabled }) {
  const { pathname } = useLocation();

  const navBarItem = disabled ? (
    <DisabledLink className='p-3 text-secondary'>{children}</DisabledLink>
  ) : (
    <InternalLink
      className={className}
      activelink={pathname === to ? 1 : 0}
      to={to}
    >
      {children}
    </InternalLink>
  );

  return navBarItem;
}
