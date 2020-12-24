import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { notificationServiceBaseURL } from '../../core/constants';
import { AuthContext } from '../../core/contexts/AuthContext';
import { signOut } from '../../core/services/auth-service';
import { markNotificationAsRead } from './notification-service';
import NotificationsComponent from './NotificationsComponent';

const UserAvatar = styled.img`
  height: 35px;
  width: 35px;
  border: 1px solid ${({ theme }) => theme.foreground.primary};
  cursor: pointer;
  border-radius: 100px;
`;

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.foreground.primary};
  outline: none;
  width: 100%;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const UserOptionsContainer = styled.div.attrs(() => ({
  className: 'position-absolute rounded',
}))`
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 1px 1px 15px black;
  right: -7rem;
  top: -4rem;
  z-index: 2;
`;

const UserOption = styled.div`
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;

const UserOptionButton = styled(StyledButton)`
  padding: 0.65rem 0.5rem;
`;

const CountPill = styled.div.attrs(() => ({
  className: 'rounded-circle font-montserrat',
}))`
  width: 21px;
  height: 21px;
  right: 12px;
  top: -10px;
  padding: 2px;
  position: absolute;
  font-size: 12px;
  background-color: ${({ theme }) => theme.accent};
`;

const Notifications = styled.div`
  position: absolute;
  top: -340px;
  right: -440px;
  z-index: 10;
`;

export default function AuthenticatedUser() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(true);

  const [auth] = useContext(AuthContext);
  const history = useHistory();

  const handleSignOut = useCallback(() => {
    signOut();
    localStorage.clear();
    sessionStorage.clear();
    history.push('/auth/sign-in');
  }, [history]);

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
          <UserOptionButton onClick={handleSignOut}>
            <FontAwesomeIcon icon='sign-out-alt'></FontAwesomeIcon>
            <span className='ml-3'>Sign out</span>
          </UserOptionButton>
        </UserOption>
      </UserOptionsContainer>
    ),
    [handleSignOut]
  );

  const [showOptions, setShowOptions] = useState(false);

  const userOptions = showOptions && createOptions();

  useEffect(() => {
    const eventSource = new EventSource(
      `${notificationServiceBaseURL}/api/v1/notifications/${auth.username}`
    );
    eventSource.onmessage = ({ data }) =>
      setNotifications((prevState) => [...prevState, JSON.parse(data)]);
    eventSource.onerror = (err) => console.log(err);

    return () => eventSource.close();
  }, [auth]);

  const toggleNotifications = useCallback(
    () => setShowNotifications((prevState) => !prevState),
    []
  );

  const handleMarkNotificationAsRead = async (notificationId) => {
    const response = await markNotificationAsRead(notificationId);

    if (response.status === 200) {
      setNotifications((prevState) =>
        prevState.filter(({ id }) => id !== notificationId)
      );
    }
  };

  const handleNotitificationComponentClose = () => setShowNotifications(false);

  const countPill = !!notifications?.length && (
    <CountPill>{notifications.length}</CountPill>
  );

  const notificationsElmenet = showNotifications && (
    <Notifications>
      <NotificationsComponent
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onClose={handleNotitificationComponentClose}
      ></NotificationsComponent>
    </Notifications>
  );

  return (
    <div className='d-flex flex-column'>
      <div className='position-relative'>
        <StyledButton className='mb-3' onClick={toggleNotifications}>
          <FontAwesomeIcon icon='bell' size='lg'></FontAwesomeIcon>
          {countPill}
        </StyledButton>

        {notificationsElmenet}
      </div>

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
