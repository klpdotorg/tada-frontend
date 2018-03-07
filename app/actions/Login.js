import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';
import { isEmpty } from 'lodash';
import { REQUEST_LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from './types';

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

        console.log(response.status, 'Failed status');
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
          sessionStorage.setItem('user', JSON.stringify(result));
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
