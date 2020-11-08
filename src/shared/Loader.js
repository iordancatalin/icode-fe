import React from 'react';
import styled from 'styled-components';
import loader from '../assets/Pulse-1s-200px.gif';

const LoaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.secondary};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <img src={loader} alt='Loader'></img>
    </LoaderContainer>
  );
}
