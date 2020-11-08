import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AuthContext } from '../../../core/contexts/AuthContext';
import GridAreaComponent from '../../../shared/GridAreaComponent';
import { resendConfirmationEmail } from '../auth-service';
import { AuthButton, AuthInput, AuthInputError } from '../Auth.components';
import { useEmailValidator } from '../hooks/email-validator';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: ${({ theme }) => theme.foreground.secondary};
`;

const Header = styled.div.attrs(() => ({
  className: 'font-montserrat',
}))`
  font-size: 2rem;
`;

const RotateAnimationIcon = styled(FontAwesomeIcon)`
  @-webkit-keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotating 4s linear infinite;
`;

const ResendContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 2fr;

  grid-template-areas:
    '. error'
    'button input';
`;

const Input = styled(AuthInput)`
  background-color: ${({ theme }) => theme.primary};
  outline: none;

  &:focus {
    outline: none;
  }
`;

const Button = styled(AuthButton)`
  &:focus {
    outline: none;
  }
`;

export default function ConfirmEmail() {
  const [authState] = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState(authState?.email);
  const [emailError, emailValidationFunc] = useEmailValidator();

  useEffect(() => {
    emailValidationFunc(emailAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResendClick = async () => {
    const response = await resendConfirmationEmail(emailAddress);

    if (response.status === 200) {
      toast.success('Email was resend');
    } else {
      toast.erro('Something went wrong');
    }
  };

  const handleEmailAddressChanged = (event) => {
    const { value } = event.target;

    emailValidationFunc(value);
    setEmailAddress(value);
  };

  const emailErrorElement = emailError && emailAddress && (
    <AuthInputError>{emailError}</AuthInputError>
  );

  return (
    <Container>
      <Header>
        <RotateAnimationIcon icon='cog' />
        <span className='ml-3'>Confirm email address</span>
      </Header>
      <div className='mt-2 font-montserrat'>
        <span>
          Thak you for joining us, you are almost there just confirm your email
          address and then
        </span>
        <Link to='/sign-in' className='ml-1'>
          Sign in
        </Link>
      </div>

      <ResendContainer className='mt-5'>
        <GridAreaComponent areaName='button' className='justify-self-end'>
          <Button
            disabled={!!emailError}
            className='font-montserrat rounded-0'
            onClick={handleResendClick}
          >
            Resend email
          </Button>
        </GridAreaComponent>
        <GridAreaComponent areaName='error'>
          {emailErrorElement}
        </GridAreaComponent>
        <GridAreaComponent areaName='input'>
          <Input
            value={emailAddress}
            onChange={handleEmailAddressChanged}
            type='email'
            className='rounded-0'
            placeholder='Email address'
          ></Input>
        </GridAreaComponent>
      </ResendContainer>
    </Container>
  );
}
