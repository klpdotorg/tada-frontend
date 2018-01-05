import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';

export const sendLoginToServer = (email, pass) => {
  return (dispatch) => {
    const loginUrl = `${SERVER_API_BASE}users/login/`;
    const body = {
      email,
      password: pass,
    };

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
        return {};
      })
      .then((result) => {
        if (result) {
          sessionStorage.setItem('user', JSON.stringify(result));
          dispatch(push('/'));
        }
      });
  };
};
