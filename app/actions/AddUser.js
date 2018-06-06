import { SERVER_API_BASE } from 'config';
import { TOGGLE_MODAL, ADD_USER_TO_USERS } from './types';
import { post } from './requests';

export const toggleAddUserModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createUser',
  };
};

export const saveNewUser = (user) => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}tada/users/`;
    post(url, user).then(({ data }) => {
      dispatch({
        type: ADD_USER_TO_USERS,
        value: data,
      });
      dispatch(toggleAddUserModal());
    });
  };
};
