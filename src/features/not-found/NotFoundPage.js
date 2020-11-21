import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.div.attrs(() => ({
  className: 'font-montserrat',
}))`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.foreground.secondary};
`;

const SubHeading = styled.div.attrs(() => ({
  className: 'font-montserrat',
}))`
  line-height: 2.5rem;
  color: ${({ theme }) => theme.foreground.secondary};
`;

export default function NotFoundPage() {
  return (
    <Container>
      <Heading>Page not found :( </Heading>
      <SubHeading>
        The page that you are trying to reach doesn't exists anymore
      </SubHeading>
    </Container>
  );
}
