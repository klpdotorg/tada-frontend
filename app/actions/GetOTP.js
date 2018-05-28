import { SERVER_API_BASE } from 'config';

import { CHANGE_OTP } from './types';
import { post } from './requests';

export const changeOTP = (value) => {
  return {
    type: CHANGE_OTP,
    value,
  };
};

export const generateOTP = (phone) => {
  const url = `${SERVER_API_BASE}users/otp-generate/`;
  post(url, {
    mobile_no: '8627019381',
  }).then(() => {
    // done sucessfully...
  });
};
