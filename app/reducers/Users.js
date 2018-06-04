import omit from 'lodash.omit';
import {
  SET_USERS,
  SHOW_USERS_LOADING,
  HIDE_USERS_LOADING,
  ADD_USER_TO_USERS,
  SET_EDIT_USER_ID,
  SELECT_USER,
  UPDATE_USER_OF_USERS,
  DELETE_USERS,
  SET_USER_COUNT,
  SET_ID_FOR_RESET_PASSWORD,
} from '../actions/types';

const INITIAL_STATE = {
  count: 0,
  loading: false,
  users: {},
  editUser: null,
  selectedUsers: [],
  resetPasswordUserId: null,
};

const Users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ID_FOR_RESET_PASSWORD:
      return {
        ...state,
        resetPasswordUserId: action.value,
      };
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
        users: {
          ...state.users,
          [action.value.id]: action.value,
        },
      };
    case UPDATE_USER_OF_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.value.id]: action.value,
        },
      };
    case SET_EDIT_USER_ID:
      return {
        ...state,
        editUser: action.value,
      };
    case DELETE_USERS:
      return {
        ...state,
        users: omit(state.users, action.value),
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUsers: action.value,
      };
    case SET_USER_COUNT:
      return {
        ...state,
        count: action.value,
      };
    default:
      return state;
  }
};

export { Users };
