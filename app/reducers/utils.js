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
    parent = entity.boundary.id;
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

export const getBoundaryType = boundary => {
  var type;
  var boundCat = boundary.boundary_category;
  if (boundCat == 13) {
    type = PRESCHOOL_DISTRICT;
  } else if (boundCat == 14) {
    type = PROJECT;
  } else if (boundCat == 15) {
    type = CIRCLE;
  } else if (boundCat == 9) {
    type = PRIMARY_DISTRICT;
  } else if (boundCat == 10) {
    type = BLOCK;
  } else if (boundCat == 11) {
    type = CLUSTER;
  }
  return type;
};
/*
Method computes the router path for an entity and returns it
*/

export const computeRouterPathForEntity = (entity, boundaryDetails, groupId) => {
  var parentEntityId = getParentId(entity, groupId);
  var path = '';

  if (parentEntityId == 2) {
    path = '/district/' + entity.id;
  } else {
    var parent = boundaryDetails[parentEntityId];
    if (parent) {
      if (entity.boundary_type === 'SB') {
        // path is parent's path plus child's

        path = parent.path + '/block/' + entity.id;
      } else if (entity.boundary_type == 'SC') {
        path = parent.path + '/cluster/' + entity.id;
      } else if (entity.boundary_category == '14') {
        path = parent.path + '/project/' + entity.id;
      } else if (entity.boundary_category == '15') {
        path = parent.path + '/circle/' + entity.id;
      } else if (entity.institution_gender) {
        path = parent.path + '/institution/' + entity.id;
      } else if (entity.group_type) {
        path = parent.path + '/studentgroups/' + entity.id;
      } else if (entity.dob) {
        path = parent.path + '/student/' + entity.id;
      }
    }
  }
  entity.path = path;
  return entity;
};

export const nodeDepth = node => {
  const category = node.boundary_type;
  const mapDepthCategory = {
    SD: 0,
    SB: 1,
    SC: 2,
  };

  if (category) {
    node.depth = mapDepthCategory[category];
  } else if (_.get(node, 'type.name') === 'Primary School') {
    node.depth = 3;
  } else if (node.group_type) {
    node.depth = 4;
  } else {
    node.depth = 5;
  }

  return node;
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
