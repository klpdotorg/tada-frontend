import _ from 'lodash';

export const CLASS = 'class';
export const BOUNDARY = 'boundary';
export const INSTITUTION = 'institution';
export const STUDENT = 'student';

// Boundary categories
export const PRESCHOOL_DISTRICT = 'preschool_district';
export const PROJECT = 'project';
export const CIRCLE = 'circle';
export const PRIMARY_DISTRICT = 'primary_district';
export const BLOCK = 'block';
export const CLUSTER = 'cluster';
/*
Function returns the parent of a particular entity given the entity. This is data massaging on the client side
because for institutions, the parent id is represented as "bouiiiiindary" in the JSON. Whereas, for boundaries, it is
represented as parent. We are treating everything as an "entity" and thus the need to abstract this away.
*/
export const getParentId = (entity, group) => {
  var parent = -1;
  // Hack to figure out if we're dealing with a school or something else. This won't work. FIX IT!
  if (_.get(entity, 'boundary.boundary_type') === 'SC') {
    parent = `${entity.boundary.id}${entity.boundary_type}`;
  } else if (entity.group_type) {
    parent = entity.institution;
  } else if (entity.dob) {
    parent = group;
  } else {
    parent = entity.parent;
  }

  return parent;
};

export const getEntityType = entity => {
  var type = '';
  if (entity) {
    if (entity.institution_gender) {
      type = INSTITUTION;
    } else if (entity.group_type) {
      type = CLASS;
    } else if (entity.dob) {
      type = STUDENT;
    } else {
      type = BOUNDARY;
    }
  }
  return type;
};

export const getBoundaryType = boundary => (
  boundary.boundary_type
  ||
  boundary.institution_type
  ||
  (boundary.type && boundary.type.id)
  ||
  boundary.group_type
);
/*
Method computes the router path for an entity and returns it
*/

export const computeRouterPathForEntity = (entity, boundaryDetails, groupId) => {
  const parentEntityId = getParentId(entity, groupId);
  const boundaryType = getBoundaryType(entity);
  let path = '';

  if (parentEntityId === 2) {
    path = `/district/${entity.id}${boundaryType}`;
  } else {
    const parent = boundaryDetails[entity.parentNode];
    if (parent) {
      switch (boundaryType) {
        case 'SB':
          path = `${parent.path}/block/${entity.id}${boundaryType}`;
          break;
        case 'SC':
          path = `${parent.path}/cluster/${entity.id}${boundaryType}`;
          break;
        case 'PP':
          path = `${parent.path}/project/${entity.id}${boundaryType}`;
          break;
        case 'PC':
          path = `${parent.path}/circle/${entity.id}${boundaryType}`;
          break;
        case 'primary':
          path = `${parent.path}/institution/${entity.id}${boundaryType}`;
          break;
        case 'pre':
          path = `${parent.path}/institution/${entity.id}${boundaryType}`;
          break;
        case 'class':
          path = `${parent.path}/studentgroup/${entity.id}${boundaryType}`;
          break;
        default:
          path = null;
      }
      // if (boundaryType === 'SB') {
      //
      // } else if (entity.boundary_type === 'SC') {
      //   path = `${parent.path}/cluster/${entity.id}${boundaryType}`;
      // } else if (entity.boundary_type === 'PP') {
      //   path = `${parent.path}/project/${entity.id}${boundaryType}`;
      // } else if (entity.boundary_type === 'PC') {
      //   path = `${parent.path}/circle/${entity.id}`;
      // } else if (_.get(entity, 'type.name') === 'Primary School') {
      //   path = parent.path + '/institution/' + entity.id;
      // } else if (entity.group_type) {
      //   path = parent.path + '/studentgroups/' + entity.id;
      // } else if (entity.dob) {
      //   path = parent.path + '/student/' + entity.id;
      // }
    }
  }

  return { ...entity, path };
};

export const nodeDepth = node => {
  const category = getBoundaryType(node);
  switch (category) {
    case 'SD':
      return 0;
    case 'SB':
      return 1;
    case 'SC':
      return 2;
    case 'PD':
      return 0;
    case 'PP':
      return 1;
    case 'PC':
      return 2;
    case 'primary':
      return 3;
    case 'pre':
      return 3;
    case 'class':
      return 4;
    default:
      return null;
  }
};

export const processStudents = (students, groupId, boundariesByParent, boundaryDetails) => {
  const studentIds = students.map(student => student.id);
  let details = students.reduce((soFar, current) => {
    current = computeRouterPathForEntity(current, boundaryDetails, groupId);
    current = nodeDepth(current);
    soFar[current.id] = current;
    return soFar;
  }, {});

  let group = boundariesByParent[groupId] || [];

  return {
    boundariesByParentId: {
      ...boundariesByParent,
      [groupId]: _.uniq(studentIds.concat(group)),
    },
    boundaryDetails: {
      ...boundaryDetails,
      ...details,
    },
  };
};
