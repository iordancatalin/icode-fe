import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../core/contexts/AuthContext';
import GridAreaComponent from '../../../shared/GridAreaComponent';
import { resendConfirmationEmail } from '../auth-service';
import { useEmailValidator } from '../hooks/email-validator';
import { AuthInputError, AuthInput, AuthButton } from '../Auth.components';
import {
  Container,
  Header,
  RotateAnimationIcon,
} from './ConfirmEmail.components';
import styled from 'styled-components';

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

export default function ResendEmail() {
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
      return;
    }

    toast.erro('Something went wrong');
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
        <Link to='/auth/sign-in' className='ml-1'>
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
