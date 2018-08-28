import { SERVER_API_BASE } from 'config';

import { CHANGE_OTP, FORGOT_PASSWORD_MOBILE_ERROR } from './types';
import { toggleModal } from './index';

export const changeOTP = (value) => {
  return {
    type: CHANGE_OTP,
    value,
  };
};

export const generateOTP = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { mobile } = state.forgotPassword;

    const url = `${SERVER_API_BASE}users/otp-generate/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_no: mobile,
      }),
    }).then((res) => {
      if (res.status === 200) {
        dispatch(toggleModal('enterOTP'));

        return res.json();
      }

      dispatch({
        type: FORGOT_PASSWORD_MOBILE_ERROR,
        value: 'Please enter valid mobile number',
      });

      return {};
    });
  };
};
