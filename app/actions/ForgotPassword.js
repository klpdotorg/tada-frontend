import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';

import {
  CHANGE_FP_MOBILE,
  CHANGE_FP_OTP,
  CHANGE_FP_PASSWORD,
  FORGOT_PASSWORD_OTP_ERROR,
  RESET_FORGOT_PASSWORD,
} from './types';
import { toggleModal, redirect } from './index';
import { showSuccessMessage } from './notifications';

export const changeFPMobile = (value) => {
  return {
    type: CHANGE_FP_MOBILE,
    value,
  };
};

export const changeFPOTP = (value) => {
  return {
    type: CHANGE_FP_OTP,
    value,
  };
};

export const changeFPPassword = (value) => {
  return {
    type: CHANGE_FP_PASSWORD,
    value,
  };
};

export const submitForgotPassword = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { password, mobile, otp } = state.forgotPassword;
    const url = `${SERVER_API_BASE}users/otp-password-reset/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_no: mobile,
        password,
        otp,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((result) => {
            return {
              success: true,
              result,
            };
          });
        }

        return res.json().then((result) => {
          return {
            success: false,
            result,
          };
        });
      })
      .then((result) => {
        if (result.success) {
          dispatch(toggleModal('enterPassword'));
          dispatch(Notifications.success(showSuccessMessage('Password Update!', 'Password updated successfully!')));
          dispatch({
            type: RESET_FORGOT_PASSWORD,
          });
          // dispatch(redirect('/login'));
        } else {
          dispatch({
            type: FORGOT_PASSWORD_OTP_ERROR,
            value: result.result,
          });
        }
      });
  };
};
