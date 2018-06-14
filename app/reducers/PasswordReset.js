import { RESET } from '../actions/types';

const INITIAL_STATE = {
  reset_request_successful: false,
  reset_request_failed: false,
  reset_confirmed: false,
  reset_rejected: false,
};

const PasswordReset = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RESET_REQUEST_SUCCESSFUL':
      return {
        ...state,
        reset_request_successful: true,
      };
    case 'RESET_REQUEST_FAILED':
      return {
        ...state,
        reset_request_failed: true,
      };
    case 'PASSWORD_RESET_CONFIRMED':
      return {
        ...state,
        reset_confirmed: true,
      };
    case 'PASSWORD_RESET_REJECTED':
      return {
        ...state,
        reset_rejected: true,
      };
    case 'CHANGE_PASSWORD_SUCCESSFUL':
      return {
        ...state,
        change_password_worked: true,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { PasswordReset };
