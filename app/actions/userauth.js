import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';
import store from '../store'


//Returns a promise. The response handling will be done in the UI component since this is temp
//state and we don't want to persist in the Redux store.
export function resetPassword(email_address){

  return function(dispatch, getState){
    return fetch(authApiBase+'auth/password/reset/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email_address
      })
    });
    
  }
}

export function changePassword(currentPassword, newPassword){

  return function(dispatch, getState){
    return fetch(authApiBase+'auth/password/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
      body: JSON.stringify({
        new_password: newPassword,
        current_password: currentPassword
      })
    });
    
  }
}



export function confirmResetPassword(userUid, userToken, newpassword){
  return function(dispatch, getState){
    return fetch(authApiBase+'auth/password/reset/confirm/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: userUid,
        token: userToken,
        new_password: newpassword,
        re_new_password: newpassword
      })
    }).then(response=>{
      if (response.status >= 200 && response.status < 300) {
        dispatch(passwordResetConfirmed());
      } 
      else
      {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).catch(error=>{
      dispatch(passwordResetRejected(error));
    })
    
  }
}

export function changeUserName(newUserName, password){
  return function(dispatch, getState){
    return fetch(authApiBase+'auth/username/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUserName,
        current_password: password
      }).then(checkStatus).then(data => {
        console.log("Username changed");
      }).catch(error=>{
        dispatch(requestFailed(error));
      })
    });
  }
}

export function checkUserAuth(email, pass) {
  return function(dispatch, getState) {
    return fetch(authApiBase + 'auth/login/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: pass
      })
    })
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    store.dispatch(logoutUser());
    store.dispatch(push('/login'));
    return;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

