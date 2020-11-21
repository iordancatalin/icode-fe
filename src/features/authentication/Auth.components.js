import styled from 'styled-components';

export const AuthContainer = styled.div.attrs(() => ({
  className: 'p-2 rounded',
}))`
  display: inline-block;
  min-width: 500px;
  background-color: ${({ theme }) => theme.primary};
`;

export const AuthHeader = styled.header.attrs(() => ({
  className: 'p-2 font-special-elite',
}))`
  color: ${({ theme }) => theme.foreground.primary};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.foreground.primary};
  font-size: 1.5rem;
`;

export const AuthMainContainer = styled.main.attrs(() => ({
  className: 'p-3',
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthInput = styled.input.attrs(() => ({
  className: 'p-2 rounded',
}))`
  min-width: 350px;
  border: 0;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.authFontColor};
`;

export const AuthButton = styled.button.attrs(() => ({
  className: 'px-4 py-2 rounded',
}))`
  border: 0;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.foreground.primary};

  &:disabled {
    filter: brightness(135%);
  }
`;

export const AuthFooter = styled.footer.attrs(() => ({
  className: 'p-3',
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthFooterInfo = styled.span`
  color: ${({ theme }) => theme.foreground.primary};
`;

export const AuthError = styled.div.attrs(() => ({
  className: 'alert alert-danger',
}))`
  min-width: 350px;
  text-align: center;
`;

export const AuthInputError = styled.div.attrs(() => ({
  className: 'text-danger mb-1 pl-1',
}))`
  font-size: 12px;
`;
