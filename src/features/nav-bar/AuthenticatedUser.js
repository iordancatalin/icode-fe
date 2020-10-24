import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const UserAvatar = styled.img`
  height: 35px;
  width: 35px;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 100px;
`;

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #fff;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const UserOptionsContainer = styled.div.attrs(() => ({
  className: 'position-absolute rounded',
}))`
  background-color: #1e1e1e;
  box-shadow: 1px 1px 15px black;
  right: -7rem;
  top: -4rem;
`;

const UserOption = styled.div`
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: #dd5c71;
  }
`;

const UserOptionButton = styled(StyledButton)`
  padding: 0.65rem 0.5rem;
`;

export default function AuthenticatedUser() {
  const createOptions = useCallback(
    () => (
      <UserOptionsContainer>
        <UserOption className='border-bottom rounded-top'>
          <UserOptionButton>
            <FontAwesomeIcon icon='user'></FontAwesomeIcon>
            <span className='ml-3'>My profile</span>
          </UserOptionButton>
        </UserOption>
        <UserOption className='rounded-bottom'>
          <UserOptionButton>
            <FontAwesomeIcon icon='sign-out-alt'></FontAwesomeIcon>
            <span className='ml-3'>Sign out</span>
          </UserOptionButton>
        </UserOption>
      </UserOptionsContainer>
    ),
    []
  );

  const [showOptions, setShowOptions] = useState(false);

  const userOptions = showOptions && createOptions();

  return (
    <div className='d-flex flex-column'>
      <StyledButton className='mb-3'>
        <FontAwesomeIcon icon='bell' size='lg'></FontAwesomeIcon>
      </StyledButton>

      <div className='d-flex justify-content-center align-items-center pb-4 position-relative'>
        <UserAvatar
          src='https://i.ibb.co/fvsFzcT/86518.png'
          alt='UserImage'
          onClick={() => setShowOptions((prevState) => !prevState)}
        ></UserAvatar>
        {userOptions}
      </div>
    </div>
  );
}
