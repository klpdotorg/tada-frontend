import { CHANGE_USER_PASSWORD, CHANGE_PASSWORD_ERROR, RESET } from '../actions/types';

const INITIAL_STATE = {
  password: '',
  error: '',
};

const ChangePassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_USER_PASSWORD:
      return {
        ...state,
        password: action.value,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { ChangePassword };
