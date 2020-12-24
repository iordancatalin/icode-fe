import { notificationServiceBaseURL } from '../../core/constants';

export const markNotificationAsRead = (notificationId) =>
  fetch(
    `${notificationServiceBaseURL}/api/v1/notification/mark-as-read/${notificationId}`,
    {
      method: 'PUT',
    }
  );
