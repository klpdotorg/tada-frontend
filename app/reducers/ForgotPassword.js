import {
  CHANGE_FP_MOBILE,
  CHANGE_FP_OTP,
  CHANGE_FP_PASSWORD,
  FORGOT_PASSWORD_MOBILE_ERROR,
  FORGOT_PASSWORD_OTP_ERROR,
  RESET,
  RESET_FORGOT_PASSWORD,
} from '../actions/types';

const INITIAL_STATE = {
  mobile: '',
  otp: '',
  password: '',
  mobileError: '',
  otpError: {},
};

const ForgotPassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FP_PASSWORD:
      return {
        ...state,
        password: action.value,
      };
    case CHANGE_FP_MOBILE:
      return {
        ...state,
        mobile: action.value,
      };
    case CHANGE_FP_OTP:
      return {
        ...state,
        otp: action.value,
      };
    case FORGOT_PASSWORD_MOBILE_ERROR:
      return {
        ...state,
        mobileError: action.value,
      };
    case FORGOT_PASSWORD_OTP_ERROR:
      return {
        ...state,
        otpError: action.value,
      };
    case RESET_FORGOT_PASSWORD:
      return INITIAL_STATE;
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { ForgotPassword };
