import {
  SET_USERS,
  SHOW_USERS_LOADING,
  HIDE_USERS_LOADING,
  ADD_USER_TO_USERS,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  users: [],
};

const Users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.value,
      };
    case SHOW_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_USERS_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ADD_USER_TO_USERS:
      return {
        ...state,
        users: [...state.users, action.value],
      };
    default:
      return state;
  }
};

export { Users };
