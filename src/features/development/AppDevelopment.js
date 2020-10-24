import React from 'react';
import styled from 'styled-components';
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
    <AppDevelopmentContainer>
      <DevelopmentHeader />
      <DevelopmentComponent />
    </AppDevelopmentContainer>
  );
}
