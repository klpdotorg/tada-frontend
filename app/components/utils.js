import { checkStatus } from '../actions/utils';
import { SERVER_API_BASE as serverApiBase } from 'config';
import { mapValues, get } from 'lodash';
export const getManagement = () => {
  return fetch(serverApiBase + 'institutionmanagements/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
  })
    .then(checkStatus)
    .catch(error => {
      console.log('request failed', error);
    });
};

export const getLanguages = () => {
  return fetch(serverApiBase + 'languages/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
  })
    .then(checkStatus)
    .catch(error => {
      console.log('request failed', error);
    });
};

export const getInstitutionCategories = () => {
  return fetch(serverApiBase + 'institutioncategories/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
  })
    .then(checkStatus)
    .catch(error => {
      console.log('request failed', error);
    });
};

export const replaceNull = obj => {
  return mapValues(obj, val => (val ? val : ''));
};

export const displayFullName = person => {
  return `${get(person, 'first_name') || ''} ${get(person, 'middle_name') || ''} ${get(person, 'last_name') || ''}`;
};

export const userHasPermissions = (permissions, institutionId) => {
  let hasPermissions = false;
  let institutions = permissions.institutions;
  let boundaries = permissions.boundaries;
  if (
    institutions.indexOf(parseInt(institutionId, 10)) > -1 ||
    boundaries.indexOf(parseInt(institutionId, 10)) > -1
  )
    hasPermissions = true;
  return hasPermissions;
};

export const isAssessment = (id, entities) => {
  let assessment = entities[id];
  let isAssess = false;
  if (assessment && assessment.programme) isAssess = true;
  return isAssess;
};
