import Notifications from 'react-notification-system-redux';
import {
  CLOSE_CONFIRM_PASSWORD_MODAL,
  OPEN_CONFIRM_PASSWORD_MODAL,
  DISABLE_CONFIRM_PASSWORD_FORM,
  ENABLE_CONFIRM_PASSWORD_FORM,
  SET_CURRENT_PASSWORD,
  SET_PASSWORD_ERROR,
} from './types';
import { checkUserPassword, baseNotification } from './index';

export const closeConfirmPasswordModal = () => {
  return {
    type: CLOSE_CONFIRM_PASSWORD_MODAL,
  };
};

export const openConfirmPasswordModal = () => {
  return {
    type: OPEN_CONFIRM_PASSWORD_MODAL,
  };
};

export const disableConfirmPasswordForm = () => {
  return {
    type: DISABLE_CONFIRM_PASSWORD_FORM,
  };
};

export const enableConfirmPasswordForm = () => {
  return {
    type: ENABLE_CONFIRM_PASSWORD_FORM,
  };
};

export const setCurrentPassword = (value) => {
  return {
    type: SET_CURRENT_PASSWORD,
    value,
  };
};

export const setPasswordError = (value) => {
  return {
    type: SET_PASSWORD_ERROR,
    value,
  };
};

export const confirmCurrentPwd = (pwd) => {
  return (dispatch) => {
    dispatch(checkUserPassword)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.closePasswordModal();
          dispatch(closeConfirmPasswordModal());
          dispatch(setCurrentPassword(pwd));
          dispatch(openChangePasswordModal());
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch(() => {
        dispatch(Notifications.error({
          ...baseNotification,
          title: 'Password Invalid',
          message: 'Current password not valid! Please try again!',
        }));
      });
  };
};
