import { CHANGE_USER_PASSWORD } from '../actions/types';

const INITIAL_STATE = {
  password: '',
};

const ChangePassword = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_USER_PASSWORD:
      return {
        ...state,
        password: action.value,
      };
    default:
      return state;
  }
};

export { ChangePassword };
