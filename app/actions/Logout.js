import { push } from 'react-router-redux';

export const logoutUser = () => {
  return (dispatch) => {
    sessionStorage.removeItem('user');
    dispatch(push('/logout'));
  };
};
