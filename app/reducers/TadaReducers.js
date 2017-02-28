import _ from 'lodash'
import {processStudents, computeRouterPathForEntity, nodeDepth, getParentId} from './utils'

const modalsDefault = {
  createDistrict: false,
  createBlock: false,
  createCluster: false,
  createProject: false,
  createCircle: false,
  createInstitution: false,
  createClass: false
}

export function schoolSelection(state = {
  primarySchool: true
}, action) {
  switch (action.type) {
    case 'PRIMARY_SELECTED':
    return {
      primarySchool: true
    }
    case 'PRESCHOOL_SELECTED':
    return {
      primarySchool: false
    }
    default:
    return state
  }
}



function processBoundaryDetails(boundaryData, boundariesByParentId, boundaryDetails) { 
  var newBoundaryDetails = {}
  if (boundaryData.length > 0) {
    //Get the parent so we can compute router path
    var parentId = getParentId(boundaryData[0]);
    boundaryData.map(boundary => {
      var id = boundary.id;

      //Special case the districts because they are top level entities and they have no parents. If

      //parent is 1, then just enter the results as the keys in the object

      boundary = computeRouterPathForEntity(boundary, boundaryDetails)
      boundary = nodeDepth(boundary)      

      if (parentId == 1) {
        boundariesByParentId[id] = [];
      } else {
        if (!boundariesByParentId[parentId]) {
          boundariesByParentId[parentId] = [];
          boundariesByParentId[parentId].push(boundary.id);
        }
        else
          boundariesByParentId[parentId].push(boundary.id);
      }
      newBoundaryDetails[id] = boundary;
    })

  }
  var mergedBoundaryDetails = Object.assign({}, boundaryDetails, newBoundaryDetails);

  return {
    boundaryDetails: mergedBoundaryDetails,
    boundariesByParentId: boundariesByParentId
  };
}

function processNewBoundary(boundary, boundariesByParentId, boundaryDetailsById)
{
    var newBoundaryDetails = {};
    var parentId = boundary.parent;
    boundary = computeRouterPathForEntity(boundary, boundaryDetailsById);
    boundary = nodeDepth(boundary);
    if (parentId == 1) {
        boundariesByParentId[boundary.id] = [];
    } 
    else {
        if (!boundariesByParentId[parentId]) {
          boundariesByParentId[parentId] = [];
          boundariesByParentId[parentId].push(boundary.id);
        }
        else
          boundariesByParentId[parentId].push(boundary.id);
    }
    newBoundaryDetails[boundary.id] = boundary;
    var mergedBoundaryDetails = Object.assign({}, boundaryDetailsById, newBoundaryDetails);
    return {
      boundaryDetails: mergedBoundaryDetails,
      boundariesByParentId: boundariesByParentId
    };
}

function processBoundaryModified(boundary, existingBoundaryDetails)
{
  var modifiedBoundary={};
  boundary = computeRouterPathForEntity(boundary,existingBoundaryDetails);
  boundary = nodeDepth(boundary);
  modifiedBoundary[boundary.id]=boundary;
  var mergedBoundaryDetails = Object.assign({},existingBoundaryDetails,modifiedBoundary);
  return {
    boundaryDetails:mergedBoundaryDetails
  }
}

export function entities(state = {
  boundariesByParentId: {},
  boundaryDetails: {1: {
    depth: 0
  }}
} , action) {
  switch (action.type) {
    case 'REQUEST_SENT':
    return {
      ...state,
      isFetching: true
    }
    case 'BOUNDARY_CREATED':
    const newBoundary = processNewBoundary(action.boundary, state.boundariesByParentId, state.boundaryDetails);
    return {
      ...state, 
      ...newBoundary,
      isFetching: false
    }
    case 'BOUNDARY_MODIFIED':
     var modBoundary = processBoundaryModified(action.boundary, state.boundaryDetails);
     var newState = Object.assign({},state, modBoundary);
    return newState;
  

    case 'RESPONSE_RECEIVED':
    const boundaryDetails = processBoundaryDetails(action.data, state.boundariesByParentId, state.boundaryDetails)
    return {
     ...state,
     ...boundaryDetails,
     isFetching: false
   }    
   case 'REQUEST_FAILED':
   return {
    ...state,
    error: action.error,
    statusCode: action.statusCode,
    statusText: action.statusText,
    isFetching: false
  }
  case 'REMOVE_BOUNDARY': 

  let copyBoundariesByParentId =  _.omit(state.boundariesByParentId, action.id);
  if (action.parentId) {
    let index = copyBoundariesByParentId[action.parentId].indexOf(parseInt(action.id));
    copyBoundariesByParentId[action.parentId].splice(index, 1)
  }
  var newBoundaryDetails = Object.assign({}, state.boundaryDetails, _.omit(state.boundaryDetails, parseInt(action.id)));

  return {
    ...state,
    boundariesByParentId: copyBoundariesByParentId,
    newBoundaryDetails: newBoundaryDetails
  }
  case 'STUDENTS_FETCHED': {
    let merged = processStudents(action.data, action.groupId, state.boundariesByParentId, state.boundaryDetails)    
    return {
     ...state,
     ...merged,
     isFetching: false
   }  
 }
 default:
 return state;
}
}

export function boundaries(state = {
  boundariesByParentId: {},
  boundaryDetails: {1: {
    depth: 0
  }}
} , action) {
  switch (action.type) {
    case 'BOUNDARIES_FULFILLED':
    const boundaryDetails = processBoundaryDetails(action.payload.results, state.boundariesByParentId, state.boundaryDetails)
    return {
     ...state,
     ...boundaryDetails,
     isFetching: false
    }    
   
    default:
    return state;
}
}





export function login(state = {
  authenticated: false,
  isLoggingIn: false,
  error: false,
  token: ''
} , action) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
    return {
      ...state,
      authenticated: false,
      isLoggingIn: true
    }
    case 'LOGIN_FAILED':
    return {
      ...state,
      authenticated: action.authenticated,
      isLoggingIn: false,
      error: true
    }
    case 'LOGIN_SUCCESS':
    return {
      ...state,
      authenticated: action.authenticated,
      token: action.auth_token,
      isLoggingIn: false,
      error: false
    }
    case 'USER_DATA_FETCHED':
    return {
      ...state,
      username: action.username,
      email: action.email,
      id: action.id,
      groups: action.groups
    }
    case 'LOGOUT':
    return {
      authenticated: false,
      isLoggingIn: false,
      error: false,
      token: ''
    }
    default:
    return state;
  }
}

export function passwordreset(state = {
  reset_request_successful: false,
  reset_request_failed: false,
  reset_confirmed: false,
  reset_rejected: false
}, action) {

  switch(action.type) {
    case 'RESET_REQUEST_SUCCESSFUL':
    return {
      ...state,
      reset_request_successful: true
    }
    case 'RESET_REQUEST_FAILED':
    return {
      ...state,
      reset_request_failed: true
    }
    case 'PASSWORD_RESET_CONFIRMED':
    return {
      ...state,
      reset_confirmed: true
    }
    case 'PASSWORD_RESET_REJECTED':
      return {
        ...state,
        reset_rejected: true
      }
    case 'CHANGE_PASSWORD_SUCCESSFUL':
      return {
        ...state,
        change_password_worked: true
      }
    default:
    return state;
  }
}


export function modal(state = modalsDefault, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
    return {
      ...state,
      [action.modal]: !state[action.modal]
    }
    default:
    return state;
  }
}
