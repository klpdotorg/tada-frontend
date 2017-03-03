import _ from 'lodash'

export const CLASS = "class";
export const BOUNDARY = "boundary";
export const INSTITUTION = "institution";
export const STUDENT = "student";
/*
Function returns the parent of a particular entity given the entity. This is data massaging on the client side
because for institutions, the parent id is represented as "bouiiiiindary" in the JSON. Whereas, for boundaries, it is
represented as parent. We are treating everything as an "entity" and thus the need to abstract this away.
*/
export const getParentId = (entity, group) => {
  var parent = -1;
  //Hack to figure out if we're dealing with a school or something else. This won't work. FIX IT!
  if (entity.institution_gender) {
    parent = entity.boundary
  } else if (entity.group_type) {
    parent = entity.institution
  } else if (entity.dob){
    parent = group
  } else {
  parent = entity.parent
 }

  return parent;
}

export const getEntityType = (entity) => {
  var type = "";
   if (entity.institution_gender) {
    type = INSTITUTION;
  } else if (entity.group_type) {
    type=CLASS;
  } else if (entity.dob){
    type=STUDENT
  } else {
    type=BOUNDARY;
 }
 return type;
}

/*
Method computes the router path for an entity and returns it
*/

export const computeRouterPathForEntity = (entity, boundaryDetails, groupId) => {  
  var parentEntityId = getParentId(entity, groupId);
  var path = '';

  if (parentEntityId == 1) {
    path = "/district/" + entity.id;
  } else {
    var parent = boundaryDetails[parentEntityId];    
    if (entity.boundary_category == "10") {
      //path is parent's path plus child's

      path = parent.path + "/block/" + entity.id;
    } else if (entity.boundary_category == "11") {

      path = parent.path + "/cluster/" + entity.id;
    } else if (entity.boundary_category == "14") {

      path = parent.path + "/project/" + entity.id;
    } else if (entity.boundary_category == "15") {

      path = parent.path + "/circle/" + entity.id;
    }  
      else if (entity.institution_gender) {
      path = parent.path + "/institution/" + entity.id

    } else if (entity.group_type) {
      path = parent.path + "/studentgroups/" + entity.id
    } else if (entity.dob) {
      path = parent.path + '/student/' + entity.id
    }
  }
  entity.path = path;
  return entity;
}

export const nodeDepth = (node) => {
  const category = node.boundary_category
  const mapDepthCategory = {
    13: 0,
    9: 0,
    14: 1,
    10: 1, 
    15: 2,
    11: 2   
  }

  if (category) {
    node.depth = mapDepthCategory[category]
  } else if (node.institution_gender) {
    node.depth = 3
  } else if (node.group_type) {
    node.depth = 4
  } else {
    node.depth = 5
  }  

  return node
}

export const processStudents = (students, groupId, boundariesByParent, boundaryDetails) => {
  const studentIds = students.map(student => student.id)
  let details = students.reduce((soFar, current) =>  {
    current = computeRouterPathForEntity(current, boundaryDetails, groupId)
    current = nodeDepth(current)      
    soFar[current.id] = current
    return soFar
  }, {})

  let group = boundariesByParent[groupId] || []  

  return {
    boundariesByParentId: {
      ...boundariesByParent,
      [groupId]: _.uniq(studentIds.concat(group))
    },
    boundaryDetails: {
      ...boundaryDetails,
      ...details
    }
  }  
  
}