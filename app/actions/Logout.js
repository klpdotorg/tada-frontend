import { RESET } from './types';
import { push } from 'react-router-redux';

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
