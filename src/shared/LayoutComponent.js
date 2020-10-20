import styled, { css } from 'styled-components';
import {
  LAYOUT_TYPE_1,
  LAYOUT_TYPE_2,
  LAYOUT_TYPE_3,
  LAYOUT_TYPE_4,
} from '../core/constants';

export default styled.div`
  display: grid;
  grid-gap: 2px;
  width: 100%;
  height: 100%;

  ${({ layoutType }) => {
    switch (layoutType) {
      case LAYOUT_TYPE_1:
        return css`
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-template-areas:
            'html css js'
            'output output output';
        `;
      case LAYOUT_TYPE_2:
        return css`
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-template-areas:
            'output output output'
            'html css js';
        `;
      case LAYOUT_TYPE_3:
        return css`
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(3, 1fr);
          grid-template-areas:
            'output html'
            'output css'
            'output js';
        `;
      case LAYOUT_TYPE_4:
        return css`
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(3, 1fr);
          grid-template-areas:
            'html output'
            'css output'
            'js output';
        `;
      default:
        return null;
    }
  }}
`;
