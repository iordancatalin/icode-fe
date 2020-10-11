import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function AuthUserOptions() {
  const [showOptions, setShowOptions] = useState(false);

  const optionsPanel = showOptions && (
    <div className='header__user-options py-2 rounded'>
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
    </div>
  );

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='mr-5'>
        <FontAwesomeIcon icon='bell' size='lg'></FontAwesomeIcon>
      </div>

      <div className='d-flex justify-content-center align-items-center flex-column mr-5 text-white position-relative'>
        <img
          src='https://i.ibb.co/fvsFzcT/86518.png'
          alt='UserImage'
          className='header__user-avatar'
          onClick={() => setShowOptions((prevState) => !prevState)}
        ></img>

        {optionsPanel}
      </div>
    </div>
  );
}
