import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from './ConfirmEmail.components';
import Loader from '../../../shared/Loader';
import { confirmEmailAddress } from '../../../core/services/auth-service';

const createEmailConfirmed = () => (
  <Container>
    <Header>
      <FontAwesomeIcon icon='check' />
      <span className='ml-3'>Email address confirmed</span>
    </Header>
    <div className='mt-2 font-montserrat'>
      <span>Them email address was confirmed with success, now you can</span>
      <Link to='/auth/sign-in' className='ml-1'>
        Sign in
      </Link>
    </div>
  </Container>
);

const createSomethingWentWrong = () => (
  <Container>
    <Header>
      <FontAwesomeIcon icon='times' />
      <span className='ml-3'>Something went wrong</span>
    </Header>
    <div className='mt-2 font-montserrat'>
      <span>
        Ooops! Something went wrong trying to confirm the email address, try
        again later.
      </span>
    </div>
  </Container>
);

const createInvalidToken = () => (
  <Container>
    <Header>
      <FontAwesomeIcon icon='times' />
      <span className='ml-3'>Invalid token</span>
    </Header>
    <div className='mt-2 font-montserrat'>
      <span>Ooops! The token that you provided is invalid.</span>
    </div>
  </Container>
);

export default function TokenValidation({ token }) {
  const [showLoader, setShowLoader] = useState(false);
  const [element, setElement] = useState();

  useEffect(() => {
    const confirmEmail = async () => {
      const response = await confirmEmailAddress(token);

      switch (response.status) {
        case 200:
          setElement(createEmailConfirmed());
          break;
        case 400:
          setElement(createInvalidToken());
          break;
        default:
          setElement(createSomethingWentWrong());
          break;
      }

      setShowLoader(false);
    };

    confirmEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loader = showLoader && <Loader />;

  return (
    <div className='d-flex flex-grow-1'>
      {element}
      {loader}
    </div>
  );
}
