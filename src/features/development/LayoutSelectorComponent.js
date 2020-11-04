import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import LayoutComponent from '../../shared/LayoutComponent';
import GridAreaComponent from '../../shared/GridAreaComponent';
import {
  LAYOUT_TYPE_1,
  LAYOUT_TYPE_2,
  LAYOUT_TYPE_3,
  LAYOUT_TYPE_4,
} from '../../core/constants';
import { LayoutContext } from './contexts/LayoutContext';

const LayoutButton = styled.button.attrs(() => ({
  className: 'p-2',
}))`
  background-color: ${({ theme }) => theme.layout.background};
  width: 50px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.layout.border};

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.accent};
    `}

  &:focus {
    outline: none;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export default function LayoutSelectorComponent() {
  const [layout, setLayout] = useContext(LayoutContext);
  const handleChangeLayout = (newLayout) => setLayout(newLayout);

  const getClassNameForLayout = (providedLayout) =>
    providedLayout === layout ? 'bg-white' : 'bkg-secondary';

  return (
    <div className='d-flex'>
      <LayoutButton
        onClick={() => handleChangeLayout(LAYOUT_TYPE_1)}
        active={layout === LAYOUT_TYPE_1}
      >
        <LayoutComponent layoutType={LAYOUT_TYPE_1}>
          <GridAreaComponent
            areaName='html'
            className={getClassNameForLayout(LAYOUT_TYPE_1)}
          />
          <GridAreaComponent
            areaName='css'
            className={getClassNameForLayout(LAYOUT_TYPE_1)}
          />
          <GridAreaComponent
            areaName='js'
            className={getClassNameForLayout(LAYOUT_TYPE_1)}
          />
          <GridAreaComponent
            areaName='output'
            className={getClassNameForLayout(LAYOUT_TYPE_1)}
          />
        </LayoutComponent>
      </LayoutButton>
      <LayoutButton
        onClick={() => handleChangeLayout(LAYOUT_TYPE_2)}
        active={layout === LAYOUT_TYPE_2}
      >
        <LayoutComponent layoutType={LAYOUT_TYPE_2}>
          <GridAreaComponent
            areaName='html'
            className={getClassNameForLayout(LAYOUT_TYPE_2)}
          />
          <GridAreaComponent
            areaName='css'
            className={getClassNameForLayout(LAYOUT_TYPE_2)}
          />
          <GridAreaComponent
            areaName='js'
            className={getClassNameForLayout(LAYOUT_TYPE_2)}
          />
          <GridAreaComponent
            areaName='output'
            className={getClassNameForLayout(LAYOUT_TYPE_2)}
          />
        </LayoutComponent>
      </LayoutButton>
      <LayoutButton
        onClick={() => handleChangeLayout(LAYOUT_TYPE_3)}
        active={layout === LAYOUT_TYPE_3}
      >
        <LayoutComponent layoutType={LAYOUT_TYPE_3}>
          <GridAreaComponent
            areaName='html'
            className={getClassNameForLayout(LAYOUT_TYPE_3)}
          />
          <GridAreaComponent
            areaName='css'
            className={getClassNameForLayout(LAYOUT_TYPE_3)}
          />
          <GridAreaComponent
            areaName='js'
            className={getClassNameForLayout(LAYOUT_TYPE_3)}
          />
          <GridAreaComponent
            areaName='output'
            className={getClassNameForLayout(LAYOUT_TYPE_3)}
          />
        </LayoutComponent>
      </LayoutButton>
      <LayoutButton
        onClick={() => handleChangeLayout(LAYOUT_TYPE_4)}
        active={layout === LAYOUT_TYPE_4}
      >
        <LayoutComponent layoutType={LAYOUT_TYPE_4}>
          <GridAreaComponent
            areaName='html'
            className={getClassNameForLayout(LAYOUT_TYPE_4)}
          />
          <GridAreaComponent
            areaName='css'
            className={getClassNameForLayout(LAYOUT_TYPE_4)}
          />
          <GridAreaComponent
            areaName='js'
            className={getClassNameForLayout(LAYOUT_TYPE_4)}
          />
          <GridAreaComponent
            areaName='output'
            className={getClassNameForLayout(LAYOUT_TYPE_4)}
          />
        </LayoutComponent>
      </LayoutButton>
    </div>
  );
}
