import _ from 'lodash';
import moment from 'moment';
import { DEFAULT_PARENT_ID } from 'config';
import { getBoundaryType } from './reducers/utils';

export const getEntityType = (boundary) => {
  const boundaryType = getBoundaryType(boundary);
  switch (boundaryType) {
    case 'SD':
      return 'district';
    case 'SB':
      return 'block';
    case 'SC':
      return 'cluster';
    case 'PP':
      return 'project';
    case 'PC':
      return 'circle';
    case 'primary':
      return 'institution';
    case 'pre':
      return 'institution';
    case 'class':
      return 'class';
    case 'student':
      return 'student';
    default:
      return null;
  }
};

export const alphabeticalOrder = (obj, details) => {
  return obj[`${DEFAULT_PARENT_ID}state`].sort((a, b) => {
    const aName = _.capitalize(details[a].name);
    const bName = _.capitalize(details[b].name);
    return aName < bName ? -1 : aName > bName ? 1 : 0;
  });
};

export const toggleSet = (set, val) => {
  if (set.has(val)) {
    set.delete(val);
  } else {
    set.add(val);
  }

  return set;
};

export const capitalize = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return null;
};

export const getNodeId = (id) => {
  return id.split('-').join('');
};

export const dateParser = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

export const convertEntitiesToObject = (entities) => {
  return entities.reduce((soFar, entity) => {
    const entityType = getEntityType(entity);
    soFar[`${entity.id}${entityType}`] = entity;

    return soFar;
  }, {});
};
