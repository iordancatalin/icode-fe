import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUserOptions from './AuthUserOptions';
import './Header.css';

const isUserLogged = false;

const createUserPanelForUnAuthenticateUser = () => (
  <Link
    to='/sign-in'
    className='d-flex justify-content-center align-items-center flex-column mr-5 text-white'
  >
    <FontAwesomeIcon icon='user' size='lg' />
    <span className='sign-in-text font-montserrat mt-1'>Sign in</span>
  </Link>
);

export default function Header() {
  const [fileName, setFileName] = useState(`Untitled`);

  const userPanelElement = isUserLogged ? <AuthUserOptions/>
    : createUserPanelForUnAuthenticateUser();

  return (
    <div className='header__container p-1'>
      <div className='header__content-panel header__file-details'>
        <div className='header__file-icon text-white'>
          <FontAwesomeIcon icon='file-alt' size='2x'></FontAwesomeIcon>
        </div>
        <div className='header__file-name'>
          <input
            type='text'
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
            className='pt-1 px-2 text-white font-montserrat'
          ></input>
        </div>
        <div className='header__file-author px-2 font-montserrat'>
          <span>by</span> <span className='text-white'>Anonymous Joker</span>
        </div>
      </div>
      <div className='header__content-panel header__run-container'>
        <button className='header__btn-run py-2 px-4 text-white'>
          <FontAwesomeIcon icon='play' />
          <span className='ml-3'>Run</span>
        </button>
      </div>
      <div className='header__content-panel header__user-container text-white'>
        {userPanelElement}
      </div>
    </div>
  );
}
