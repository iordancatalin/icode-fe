import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const InternalLink = styled(Link).attrs(() => ({
  className: 'p-3',
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.foreground.primary};
  border-left: 6px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.foreground.primary};
  }

  ${({ activelink }) =>
    activelink &&
    css`
      color: ${({ theme }) => theme.accent};
      border-color: ${({ theme }) => theme.accent};

      &:hover {
        color: ${({ theme }) => theme.accent};
      }
    `}
`;

const DisabledLink = styled.div.attrs(() => ({
  className: 'p-3',
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 6px solid transparent;
  color: ${({ theme }) => theme.disabled};
`;

export default function NavBarLink({
  to,
  children,
  className,
  disabled = false,
}) {
  const { pathname } = useLocation();

  const navBarItem = disabled ? (
    <DisabledLink>{children}</DisabledLink>
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
