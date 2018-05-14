import _ from 'lodash';
import moment from 'moment';
import { DEFAULT_PARENT_ID } from 'config';
import { getBoundaryType } from './reducers/utils';

export const getEntityDepth = (boundary) => {
  const boundaryType = getBoundaryType(boundary);
  switch (boundaryType) {
    case 'ST':
      return 0;
    case 'PD':
      return 1;
    case 'SD':
      return 1;
    case 'SB':
      return 2;
    case 'SC':
      return 3;
    case 'PP':
      return 2;
    case 'PC':
      return 3;
    case 'primary':
      return 4;
    case 'pre':
      return 4;
    case 'class':
      return 5;
    case 'center':
      return 5;
    case 'student':
      return 6;
    default:
      return null;
  }
};

export const hasChildren = (entityId, boundaries) => {
  const { boundaryDetails, boundariesByParentId } = boundaries;
  const boundary = boundaryDetails[entityId];
  const depth = getEntityDepth(boundary);
  const hasChilds = _.get(boundariesByParentId, depth, []);

  return _.isEmpty(hasChilds);
};

export const getEntityType = (boundary) => {
  const boundaryType = getBoundaryType(boundary);
  switch (boundaryType) {
    case 'ST':
      return 'state';
    case 'PD':
      return 'district';
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
    case 'center':
      return 'studentgroup';
    case 'class':
      return 'studentgroup';
    case 'student':
      return 'students';
    case 'monitor':
      return 'assessment';
    case 'assessment':
      return 'assessment';
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

export const convertArrayToObject = (entities) => {
  return entities.reduce((soFar, entity) => {
    const result = soFar;
    result[entity.id] = entity;

    return result;
  }, {});
};

export const convertEntitiesToObject = (entities) => {
  return entities.reduce((soFar, entity) => {
    const entityType = getEntityType(entity);
    soFar[`${entity.id}${entityType}`] = entity;

    return soFar;
  }, {});
};

export const getPath = (state, uniqueId, depth) => {
  let path = '';
  const { uncollapsedEntities, boundaryDetails } = state.boundaries;

  if (_.includes(uniqueId, 'state')) {
    return '/';
  }

  _.forEach(uncollapsedEntities, (id, entityDepth) => {
    if (Number(entityDepth) < depth) {
      const entity = boundaryDetails[id];
      const entityType = getEntityType(entity);
      path += `/${entityType}/${id}`;
    }
  });

  if (typeof uniqueId === 'object') {
    if (!path.includes(uniqueId.uniqueId)) {
      path += `/${uniqueId.type}/${uniqueId.uniqueId}`;
    }
  }

  if (typeof uniqueId === 'string' && !path.includes(uniqueId)) {
    const openEntity = boundaryDetails[uniqueId];
    const type = getEntityType(openEntity);
    path += `/${type}/${uniqueId}`;
  }

  return path;
};

// export const generatePagination = (current, max, step) => {
//   let result = [];

//   if (max < 9) {
//     return _.range(1, max + 1);
//   }

//   if (current <= step) {
//     const values = _.range(1, step);
//     result = [...result, ...values];
//   } else {
//     const values = _.range(current, current + step);

//     result = [...result, ...values];
//   }

//   result.push('...');
//   const newValues = _.range(max - (step - 1), max + 1);
//   result = [...result, ...newValues];

//   return result;
// };

const add = (a, b) => {
  return _.range(a, b);
};

const last = (size) => {
  return ['...', size];
};

const first = () => {
  return ['1', '...'];
};

export const generatePagination = (page, size, step) => {
  let result = [];
  if (size < step * 2 + 6) {
    const value = add(1, size + 1);
    result = [...result, ...value];
  } else if (page < step * 2 + 1) {
    const value = add(1, step * 2 + 4);
    const lastVal = last(size);
    result = [...result, ...value, ...lastVal];
  } else if (page > size - step * 2) {
    const firstVal = first();
    const value = add(size - (step * 2 - 2), size + 1);
    result = [...result, ...firstVal, ...value];
  } else {
    const firstVal = first();
    const value = add(page - step, page + step + 1);
    const lastVal = last(size);
    result = [...result, ...firstVal, ...value, ...lastVal];
  }

  return result;
};

export const checkPermissions = (isAdmin, permissions, boundaryId, institutionId) => {
  const { boundaries, institutions } = permissions;

  if (isAdmin) {
    return true;
  }

  if (boundaryId.length) {
    let find = false;
    boundaryId.forEach((id) => {
      if (boundaries.includes(id)) {
        find = true;
      }
    });

    return find;
  }

  if (typeof boundaryId === 'string' && boundaries.includes(boundaryId)) {
    return true;
  }

  if (institutions.includes(institutionId)) {
    return true;
  }

  return false;
};
