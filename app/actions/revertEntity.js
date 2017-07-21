import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE as serverApiBase, SERVER_AUTH_BASE as authApiBase } from 'config';
import { get, checkStatus } from './utils';
import { entityActivated, entityNotActivated } from './notifications';

export const getInactiveEntities = (entityName, from) => {
  if (entityName === 'users') {
    return get(`${authApiBase}auth/${entityName}/?is_active=False&offset=${from}`);
  }

  return get(`${serverApiBase}${entityName}/?active=1&offset=${from}`);
};

export const revertEntity = (entityName, entity, dispatch) => {
  if (entityName === 'users') {
    return fetch(`${authApiBase}auth/${entityName}/${entity.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
      body: JSON.stringify(entity),
    })
      .then(checkStatus)
      .then(res => {
        if (!res) {
          dispatch(Notifications.error(entityNotActivated));
        } else {
          dispatch(Notifications.success(entityActivated));
        }
        return res;
      });
  }

  return fetch(`${serverApiBase}${entityName}/${entity.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
    body: JSON.stringify(entity),
  })
    .then(checkStatus)
    .then(res => {
      if (!res) {
        dispatch(Notifications.error(entityNotActivated));
      } else {
        dispatch(Notifications.success(entityActivated));
      }
      return res;
    });
};
