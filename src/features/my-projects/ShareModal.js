import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  min-width: 350px;
  border-radius: 2px;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;

  padding: 0.75rem;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.foreground.primary};
`;

const ModalBody = styled.div`
  display: flex;
  flex-flow: column;

  justify-content: center;
  align-items: center;

  padding: 0.75rem;
  background-color: ${({ theme }) => theme.secondary};
`;

const ModalInput = styled.input.attrs(() => ({
  className: 'p-2',
}))`
  min-width: 350px;
  border: 0;
  outline: none;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.authFontColor};
  border-bottom: 1px solid ${({ theme }) => theme.authFontColor};
`;

const ModalButton = styled.button.attrs(() => ({
  className: 'px-4 py-2 rounded mt-3',
}))`
  max-width: 200px;
  border: 0;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.foreground.primary};

  &:disabled {
    filter: brightness(135%);
  }
`;

const CloseButton = styled.button`
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.foreground.primary};
  outline: none;

  &:focus {
    outline: none;
  }
`;

export default function ShareModal({ onClose, onProceed, projectRef }) {
  const [username, setUsername] = useState('');

  return (
    <Modal>
      <ModalContainer>
        <ModalHeader>
          <div>Share project</div>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon='times'></FontAwesomeIcon>
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalInput
            placeholder='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></ModalInput>
          <ModalButton
            disabled={!username}
            onClick={() => onProceed({ projectRef, username })}
          >
            Share
          </ModalButton>
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
}
