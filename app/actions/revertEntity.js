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

const showReactivationStatus = (res, dispatch) => {
  if (!res) {
    dispatch(Notifications.error(entityNotActivated));
  } else {
    dispatch(Notifications.success(entityActivated));
  }
};

const reactiveUser = (entity, entityName, dispatch) =>
  fetch(`${authApiBase}auth/${entityName}/${entity.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
    body: JSON.stringify({ is_active: true }),
  })
    .then(checkStatus)
    .then(res => {
      showReactivationStatus(res, dispatch);
      return res;
    });

export const revertEntity = (entityName, entity, dispatch) => {
  if (entityName === 'users') {
    return reactiveUser(entity, entityName, dispatch);
  }

  let url = `${serverApiBase}${entityName}/${entity.id}`;

  if (entityName === 'assessments') {
    url = `${serverApiBase}programmes/${entity.programme}/${entityName}/${entity.id}`;
  }

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
    body: JSON.stringify(entity),
  })
    .then(checkStatus)
    .then(res => {
      showReactivationStatus(res, dispatch);
      return res;
    });
};
