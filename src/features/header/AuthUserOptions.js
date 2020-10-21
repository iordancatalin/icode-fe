import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const UserOptionsComponent = styled.div.attrs(() => ({
  className: 'py-2 rounded',
}))`
  position: absolute;
  right: 0px;
  min-width: 200px;
  bottom: -9rem;
  z-index: 2;
  background-color: #333333;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;

      &:hover {
        background-color: #e94560;
      }
    }
  }
`;

const UserAvatar = styled.img`
  height: 45px;
  width: 45px;
  border: 1px solid #fff;
  border-radius: 5px;
  cursor: pointer;
`;

export default function AuthUserOptions() {
  const [showOptions, setShowOptions] = useState(false);

  const optionsPanel = showOptions && (
    <UserOptionsComponent>
      <ul>
        <li className='py-2 px-3 d-flex align-items-center justify-content-start font-montserrat active'>
          <FontAwesomeIcon icon='home' className='ml-2' />
          <span className='ml-4'>My projects</span>
        </li>
        <li className='py-2 px-3 d-flex align-items-center justify-content-start font-montserrat'>
          <FontAwesomeIcon icon='cog' className='ml-2' />
          <span className='ml-4'>Settings</span>
        </li>
        <li className='py-2 px-3 d-flex align-items-center justify-content-start font-montserrat border-top border-secondary'>
          <FontAwesomeIcon icon='sign-out-alt' className='ml-2' />
          <span className='ml-4'>Sign out</span>
        </li>
      </ul>
    </UserOptionsComponent>
  );

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='mr-5'>
        <FontAwesomeIcon icon='bell' size='lg'></FontAwesomeIcon>
      </div>

      <div className='d-flex justify-content-center align-items-center flex-column mr-5 text-white position-relative'>
        <UserAvatar
          src='https://i.ibb.co/fvsFzcT/86518.png'
          alt='UserImage'
          onClick={() => setShowOptions((prevState) => !prevState)}
        ></UserAvatar>

        {optionsPanel}
      </div>
    </div>
  );
}
