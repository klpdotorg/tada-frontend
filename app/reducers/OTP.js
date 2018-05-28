import { CHANGE_OTP } from '../actions/types';

const INITIAL_STATE = {
  otp: '',
};

const OTP = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_OTP:
      return {
        ...state,
        otp: action.value,
      };
    default:
      return state;
  }
};

export { OTP };
