import { push } from 'react-router-redux';

import { RESET } from './types';

export const logoutUser = () => {
  return (dispatch) => {
    sessionStorage.removeItem('user');
    dispatch({
      type: RESET,
    });
    dispatch(push('/logout'));
  };
};

export const tokenExpired = () => {
  return (dispatch) => {
    sessionStorage.removeItem('user');
    dispatch({
      type: RESET,
    });
    dispatch(push('login'));
  };
};
