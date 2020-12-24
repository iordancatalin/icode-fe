import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  width: 450px;
  height: 350px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 8px #000;
  display: flex;
  flex-direction: column;
`;

const NotificationsHeader = styled.div.attrs(() => ({
  className: 'font-montserrat',
}))`
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.foreground.primary};

  display: flex;
  justify-content: space-between;
`;

const NotificationsBody = styled.div`
  padding: 0.2rem;
  background-color: ${({ theme }) => theme.secondary};
  flex: 1;
  overflow: auto;
`;

const NotificationContainer = styled.div`
  display: flex;
  padding: 0.55rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.foreground.secondary};
  border-bottom: 1px solid gray;
  margin-top: 0.5rem;
`;

const NotificationInfo = styled.div`
  padding: 0.25rem;
`;

const IconButton = styled.button`
  color: ${({ theme }) => theme.foreground.secondary};
  border: 0;
  background-color: transparent;
  outline: none;

  &:focus {
    outline: none;
  }
`;

export default function NotificationsComponent({
  notifications,
  onMarkAsRead,
  onClose,
}) {
  const createNotification = useCallback(
    ({ from, projectName, id }) => (
      <NotificationContainer key={id}>
        <NotificationInfo>{`${from} shared project ${projectName} with you`}</NotificationInfo>
        <IconButton onClick={() => onMarkAsRead(id)} title='Mark as read'>
          <FontAwesomeIcon icon='envelope-open'></FontAwesomeIcon>
        </IconButton>
      </NotificationContainer>
    ),
    [onMarkAsRead]
  );

  const notificationsElements = notifications?.length ? (
    notifications?.map((notification) => createNotification(notification))
  ) : (
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
      <h2 className='font-montserrat'>Inbox is empty :)</h2>
    </div>
  );

  return (
    <NotificationsContainer>
      <NotificationsHeader>
        <div>Notifications</div>
        <IconButton onClick={onClose}>
          <FontAwesomeIcon icon='chevron-down'></FontAwesomeIcon>
        </IconButton>
      </NotificationsHeader>
      <NotificationsBody>{notificationsElements}</NotificationsBody>
    </NotificationsContainer>
  );
}
