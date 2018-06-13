import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';
import isEmpty from 'lodash.isempty';
import { REQUEST_LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, SET_USER_PROFILE } from './types';

export const getDataFromLocalstorage = () => {
  const data = sessionStorage.getItem('user');

  if (!data) {
    return {};
  }

  return JSON.parse(data);
};

export const setDataInLocalStorage = (user) => {
  return (dispatch, getState) => {
    const state = getState();

    const newUser = {
      id: user.id,
      email: user.email,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      mobileNo: user.mobile_no,
      isAdmin: user.is_superuser,
      token: user.token,
      groups: user.groups,
      state_code: state.states.selectedState,
    };

    dispatch({
      type: SET_USER_PROFILE,
      value: newUser,
    });

    const existingData = getDataFromLocalstorage();

    sessionStorage.setItem('user', JSON.stringify({ ...existingData, ...newUser }));
  };
};

export const sendLoginToServer = (email, pass) => {
  return (dispatch) => {
    const loginUrl = `${SERVER_API_BASE}users/login/`;
    const body = {
      username: email,
      password: pass,
    };

    dispatch({
      type: REQUEST_LOGIN,
    });

    return fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        dispatch({
          type: LOGIN_FAILED,
          authenticated: false,
        });

        return {};
      })
      .then((result) => {
        if (!isEmpty(result)) {
          // On successful login
          dispatch({
            type: LOGIN_SUCCESS,
            id: result.id,
            authenticated: true,
            token: result.token,
          });

          // Setting data in local storage
          dispatch(setDataInLocalStorage(result));
          dispatch(push('/'));
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED,
          authenticated: false,
        });
      });
  };
};
