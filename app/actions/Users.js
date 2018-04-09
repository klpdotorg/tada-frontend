import { SERVER_API_BASE } from 'config';
import { get } from './requests';
import { SET_USERS, SHOW_USERS_LOADING, HIDE_USERS_LOADING } from './types';

const showUsersLoading = () => {
  return {
    type: SHOW_USERS_LOADING,
  };
};

const hideUsersLoading = () => {
  return {
    type: HIDE_USERS_LOADING,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(showUsersLoading());
    const url = `${SERVER_API_BASE}tada/users/`;
    get(url).then((res) => {
      dispatch({
        type: SET_USERS,
        value: res.results,
      });
      dispatch(hideUsersLoading());
    });
  };
};
