import { SERVER_API_BASE } from 'config';
import { TOGGLE_MODAL, ADD_USER_TO_USERS, SET_USER_ERROR } from './types';
import { post } from './requests';

export const toggleAddUserModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createUser',
    });
    dispatch({
      type: SET_USER_ERROR,
      value: {},
    });
  };
};

export const saveNewUser = (user) => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;
    const url = `${SERVER_API_BASE}tada/users/?state=${state_code}`;
    post(url, user).then((response) => {
      if (response.status === 201) {
        dispatch({
          type: ADD_USER_TO_USERS,
          value: response.data,
        });
        dispatch({
          type: SET_USER_ERROR,
          value: {},
        });
        dispatch(toggleAddUserModal());
      } else {
        dispatch({
          type: SET_USER_ERROR,
          value: response.data,
        });
      }
    });
  };
};
