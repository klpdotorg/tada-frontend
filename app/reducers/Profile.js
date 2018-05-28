import { SET_USER_PROFILE } from '../actions/types';

const INITIAL_STATE = {
  isAdmin: true,
};

const Profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        ...action.value,
      };
    default:
      return state;
  }
};

export { Profile };
