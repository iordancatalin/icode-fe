import React from 'react';
import styled from 'styled-components';
import { LayoutContextProviver } from './contexts/LayoutContext';
import DevelopmentComponent from './DevelopmentComponent';
import DevelopmentHeader from './DevelopmentHeader';

const AppDevelopmentContainer = styled.div.attrs(() => ({
  className: 'p-2',
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function AppDevelopment() {
  return (
    <LayoutContextProviver>
      <AppDevelopmentContainer>
        <DevelopmentHeader />
        <DevelopmentComponent />
      </AppDevelopmentContainer>
    </LayoutContextProviver>
  );
}
