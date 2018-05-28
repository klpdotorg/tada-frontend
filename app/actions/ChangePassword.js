import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE } from 'config';

import { post } from './requests';
import { TOGGLE_MODAL, CHANGE_USER_PASSWORD } from './types';
import { generateOTP, baseNotification } from './index';

export const openChangePasswordModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'changePasswordModal',
  };
};

export const handleChangePassword = (value) => {
  return (dispatch) => {
    // Generating otp for user
    generateOTP();
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

export const resetPassword = (otp) => {
  return (dispatch, getState) => {
    const state = getState();
    const { password } = state.changePassword;
    const { mobileNo } = state.profile;

    const url = `${SERVER_API_BASE}users/otp-password-reset/`;
    post(url, {
      mobile_no: mobileNo,
      password,
      otp,
    }).then((res) => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'changeOTP',
      });
      dispatch(Notifications.success({
        ...baseNotification,
        title: 'Password Reset',
        message: 'User password reset successfully!',
      }));
    });
  };
};
