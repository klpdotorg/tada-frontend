import Notifications from 'react-notification-system-redux';

import store from '../store';
import { syncError, errorNotification } from './notifications';
import { logoutUser } from './index';

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then((json) => {
      return {
        data: json,
        status: response.status,
      };
    });
  } else if (response.status === 401) {
    store.dispatch(logoutUser());
    return null;
  } else if (response.status === 403) {
    store.dispatch(Notifications.error(errorNotification('Permission Error!', "You don't permission to do it.")));
    return {
      data: {},
      status: response.status,
    };
  } else if (response.status === 400) {
    return response.json().then((json) => {
      return {
        data: json,
        status: response.status,
      };
    });
  } else if (response.status === 500) {
    return {
      data: {},
      status: response.status,
    };
  }

  return null;
};

export const checkStatusNoJSON = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    store.dispatch(logoutUser());
    return null;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const get = (url) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${user.token}`,
    },
  })
    .then(checkStatus)
    .catch((e) => {
      store.dispatch(Notifications.error(syncError(e)));
      // store.dispatch(tokenExpired());
    });
};

export const deleteRequest = (url) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${user.token}`,
    },
  }).catch((e) => {
    store.dispatch(Notifications.error(syncError(e)));
    // store.dispatch(tokenExpired());
  });
};

export const post = (url, body) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${user.token}`,
    },
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .catch((e) => {
      store.dispatch(Notifications.error(syncError(e)));
      // store.dispatch(tokenExpired());
    });
};

export const patch = (url, body) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${user.token}`,
    },
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .catch((e) => {
      store.dispatch(Notifications.error(syncError(e)));
      // store.dispatch(tokenExpired());
    });
};

export const put = (url, body) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${user.token}`,
    },
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .catch((e) => {
      store.dispatch(Notifications.error(syncError(e)));
      // store.dispatch(tokenExpired());
    });
};
