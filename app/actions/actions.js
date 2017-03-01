import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {checkStatus, get} from './utils'

import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';
 import { urls as Urls } from '../constants';
 import _ from 'lodash'
 import store from '../store'
 import {boundaryType, genUrl} from './utils'



function requestDataFromServer() {
  return {
    type: 'REQUEST_SENT'
  }
}

function responseReceivedFromServer(resp) {
  return {
    type: 'RESPONSE_RECEIVED',
    data: resp.results
  }
}

function requestFailed(error) {
  console.log('error', error)
  return {
    type: 'REQUEST_FAILED',
    statusCode: error.response.status,
    statusText: error.response.statusText,
    error: error.response
  }
}

export function requestLogin(username) {
  return {
    type: 'LOGIN_REQUESTED',
    username
  }
}

export function loginSuccess(authtoken) {
  return {
    type: 'LOGIN_SUCCESS',
    authenticated: true,
    auth_token: authtoken
  }
}



function loginError() {
  return {
    type: 'LOGIN_FAILED',
    error: true,
    authenticated: false
  }
}

export function userRegistrationSuccess(response) {
  return {
    type: 'USER_REGISTERED_SUCCESS',
    registered: true,
    error: false,
    username: response.username,
    email: response.email,
    id: response.id
  }
}

//Write user registration failure case

function requestLogout() {
  return {
    type: 'LOGOUT'
  }
}

export function logoutUser() {
  return function(dispatch, getState) {
    return fetch(Urls.LOGOUT, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
    }).then(response => {
      if(response.status > 200 && response.status < 300)
      {
        sessionStorage.removeItem('token');
        store.dispatch(push('/logout'));
      }
    }).catch(error => {
      console.log(error);
    });


  }
}

function userDataFetched(data) {
  return {
    type: 'USER_DATA_FETCHED',
    username: data.username,
    email: data.email,
    groups: data.groups,
    id: data.id
  }
}


export function fetchUserData() {
  const token = sessionStorage.getItem('token')
  return function(dispatch) {
    return fetch(Urls.USER_PROFILE, {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
      },
    }).then(response => (checkStatus(response)))
    .then(data => {
      /* HACK: Remove this if permissions are implemented */
      if (data.email == "tadaadmin@klp.org.in" || 'aksanoble@gmail.com') {
        sessionStorage.setItem('isAdmin', true);
      }
      dispatch(loginSuccess(token))
      dispatch(userDataFetched(data))
    })
    .catch(error => {
      console.log(error.response);
      dispatch(requestFailed(error));
    })
  }
}

export function sendRegisterUser(email, password, username) {
  return function(dispatch, getState) {

    return fetch(Urls.REGISTER, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then(data => {

      dispatch(userRegistrationSuccess(data))
      //dispatch(fetchUserData(sessionStorage.token))
      //dispatch(push('/'))
    }).catch(error => {
      //dispatch(loginError(error));
      console.error('request failed', error)
    })
  }
}

export function sendLoginToServer(email, pass) {
  return function(dispatch, getState) {

    return fetch(Urls.LOGIN, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: pass
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then(data => {
      sessionStorage.setItem('token', data.auth_token);

      dispatch(loginSuccess(data.auth_token))
      dispatch(fetchUserData(sessionStorage.token))
      dispatch(push('/'))
    }).catch(error => {
      dispatch(loginError(error));
      console.error('request failed', error)
    })
  }
}

