import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE } from 'config';

import { put } from './requests';
import { TOGGLE_MODAL, CHANGE_USER_PASSWORD, CHANGE_PASSWORD_ERROR } from './types';
import { baseNotification } from './index';

export const openChangePasswordModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'changePasswordModal',
  };
};

export const handleChangePassword = (value) => {
  return (dispatch) => {
    // Generating otp for user
    // generateOTP();
    dispatch({
      type: CHANGE_USER_PASSWORD,
      value,
    });
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'changePasswordModal',
    });
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'changeOTP',
    });
  };
};

export const updatePassword = (body) => {
  return (dispatch, getState) => {
    const state = getState();
    const { newPassword, oldPassword } = body;
    const { id } = state.profile;
    const url = `${SERVER_API_BASE}tada/users/${id}/change-password/`;
    put(url, {
      old_password: oldPassword,
      new_password: newPassword,
    }).then((response) => {
      if (response.status === 400) {
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
          value: response.data[0],
        });
      }

      if (response.status === 200) {
        dispatch(Notifications.success({
          ...baseNotification,
          title: 'Password Reset',
          message: 'User password reset successfully!',
        }));
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'changePasswordModal',
        });
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
          value: '',
        });
      }
    });
  };
};
