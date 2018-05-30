import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase, SERVER_AUTH_BASE as authApiBase } from 'config';
import store from '../store';
import { urls as Urls } from '../constants';
import { checkStatusNoJSON } from './requests';

export function checkUserPassword(pass) {
  return function (dispatch, getState) {
    return fetch(Urls.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: getState().login.username,
        password: pass,
      }),
    });
  };
}

// Returns a promise. The response handling will be done in the UI component since this is temp
// state and we don't want to persist in the Redux store.
export function resetPasswordEmail(email_address) {
  return function (dispatch, getState) {
    return fetch(`${authApiBase}auth/password/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email_address,
      }),
    });
  };
}

export function resetPasswordForce(id, newPassword) {
  return function (dispatch, getState) {
    return fetch(`${Urls.USERS + id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    }).then(checkStatusNoJSON);
  };
}

export function changePassword(currentPassword, newPassword) {
  return function (dispatch, getState) {
    return fetch(`${authApiBase}auth/password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        new_password: newPassword,
        current_password: currentPassword,
      }),
    }).then(checkStatusNoJSON);
  };
}

export function deleteUser(userid) {
  return function (dispatch, getState) {
    console.log('Inside deleteUser', userid);
    return fetch(`${Urls.USERS + userid}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then(checkStatusNoJSON)
      .then((response) => {
        dispatch(userDeleted(userid));
      });
  };
}

export function confirmResetPassword(userUid, userToken, newpassword) {
  return function (dispatch, getState) {
    return fetch(`${authApiBase}auth/password/reset/confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: userUid,
        token: userToken,
        new_password: newpassword,
        re_new_password: newpassword,
      }),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(passwordResetConfirmed());
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        dispatch(passwordResetRejected(error));
      });
  };
}

export function changeUserName(newUserName, password) {
  return function (dispatch, getState) {
    return fetch(`${authApiBase}auth/username/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUserName,
        current_password: password,
      })
        .then(checkStatus)
        .then((data) => {
          console.log('Username changed');
        })
        .catch((error) => {
          dispatch(requestFailed(error));
        }),
    });
  };
}

export function checkUserAuth(email, pass) {
  return function (dispatch, getState) {
    return fetch(`${authApiBase}auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: pass,
      }),
    });
  };
}

export function listUsers() {
  fetchUsers(1);
}

export function fetchAllUsers() {
  return function (dispatch, getState) {
    dispatch(requestAllUsers());
    return fetch(`${Urls.USERS}?is_active=True&limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(allUsersFetched(data));
        return data;
      });
  };
}

export function fetchUsers(pageNumber) {
  return function (dispatch, getState) {
    // First dispatch a "REQUEST_PAGE" event. Get reducer to handle it.
    // Check if we've already fetched and if so, no need to issue a REST call.
    if (getState().users.pages[pageNumber] && getState().users.pages[pageNumber].ids.length > 0) {
      return;
    }
    var offset = (pageNumber - 1) * 20;
    return fetch(`${Urls.USERS}?is_active=True&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(usersFetched(data, pageNumber));
        return data;
      });
  };
}

function addUserToRoleOnly(userid, role) {
  return function (dispatch, getState) {
    return fetch(`${Urls.USERS + userid}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        group: role,
      }),
    });
  };
}

export function addUserToRole(userid, firstname, lastname, role) {
  return function (dispatch, getState) {
    return fetch(`${Urls.USERS + userid}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        group: role,
        first_name: firstname,
        last_name: lastname,
      }),
    });
  };
}

export function deactivateUser(id) {
  return function (dispatch, getState) {
    return fetch(`${Urls.USERS + id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({ is_active: false }),
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(userDeleted(data.id));
      });
  };
}

export function modifyUser(id, firstName, lastName, email, role) {
  return function (dispatch, getState) {
    return fetch(`${Urls.USERS + id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
      }),
    })
      .then(checkStatus)
      .then(() => {
        dispatch(addUserToRoleOnly(id, role))
          .then(checkStatus)
          .then((data) => {
            dispatch(userModified(data));
          });
      });
  };
}

function selfModified(data) {
  return {
    type: 'SELF_MODIFIED',
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
  };
}

export function modifySelf(email, firstName, lastName) {
  return function (dispatch, getState) {
    let id = getState().login.id;
    return fetch(`${Urls.USERS + id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
      }),
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(selfModified(data));
        return data;
      });
  };
}

export function createUser(firstname, lastname, username, email, password, role) {
  return function (dispatch, getState) {
    return fetch(Urls.USER_REGISTRATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        username,
        password,
        email,
      }),
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(addUserToRole(data.id, firstname, lastname, role))
          .then(checkStatus)
          .then((userrole) => {
            dispatch(userCreated(userrole));
          });
        return data;
      });
  };
}

export const requestAllUsers = () => {
  return {
    type: 'REQUEST_ALL_USERS',
  };
};

function userCreated(userdata) {
  return {
    type: 'USER_CREATED',
    user: userdata,
  };
}

function userModified(userdata) {
  return {
    type: 'USER_MODIFIED',
    user: userdata,
  };
}

function allUsersFetched(data) {
  return {
    type: 'ALL_USERS_FETCHED',
    users: data.results,
    count: data.count,
  };
}

function usersFetched(data, page) {
  return {
    type: 'USERS_FETCHED',
    users: data.results,
    count: data.count,
    page,
  };
}

export function setCurrentPage(page) {
  return {
    type: 'SET_CURRENT_PAGE',
    page,
  };
}

function userDeleted(id) {
  return {
    type: 'USER_DELETED',
    id,
  };
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
