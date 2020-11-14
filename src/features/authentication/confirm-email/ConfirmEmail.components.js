import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: ${({ theme }) => theme.foreground.secondary};
`;

export const Header = styled.div.attrs(() => ({
  className: 'font-montserrat',
}))`
  font-size: 2rem;
`;

export const RotateAnimationIcon = styled(FontAwesomeIcon)`
  @-webkit-keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotating 4s linear infinite;
`;
