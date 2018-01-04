import Notifications from 'react-notification-system-redux';

import { STATE_CODE } from 'config';
import store from '../store';
import { syncError } from './notifications';

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    // store.dispatch(logoutUser());
    // store.dispatch(push('/login'));
    return null;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const checkStatusNoJSON = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    store.dispatch(logoutUser());
    store.dispatch(push('/login'));
    return null;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const get = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    // Authorization: 'Token 70b0eb043ca0d71d3434ad8cd395c79db140ef6a',
    },
  })
    .then(checkStatus)
    .catch((e) => {
      store.dispatch(Notifications.error(syncError(e)));
    });
};

export const deleteRequest = (url) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token 47d78a3b3a324896999a8caa0f153c2cda39f8a6',
    },
  }).catch((e) => {
    store.dispatch(Notifications.error(syncError(e)));
  });
};

export const post = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token 47d78a3b3a324896999a8caa0f153c2cda39f8a6',
    },
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .catch((e) => {
      store.dispatch(Notifications.error(syncError(e)));
      throw e;
    });
};

export const patch = (url, body) => {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token 47d78a3b3a324896999a8caa0f153c2cda39f8a6',
    },
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .catch((e) => {
      console.log(e);
      store.dispatch(Notifications.error(syncError(e)));
      throw e;
    });
};
