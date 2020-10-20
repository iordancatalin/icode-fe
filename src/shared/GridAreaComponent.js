import styled, { css } from 'styled-components';

export default styled.div`
  ${({ areaName }) =>
    areaName &&
    css`
      grid-area: ${areaName};
    `};
`;
