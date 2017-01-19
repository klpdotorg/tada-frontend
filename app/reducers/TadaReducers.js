import _ from 'lodash'
import {processStudents, computeRouterPathForEntity, nodeDepth, getParentId} from './utils'

const modalsDefault = {
  createDistrict: false,
  createBlock: false,
  createCluster: false,
  createProject: false,
  createCircle: false,
  createInstitution: false
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
  //Making an assumption that the entire set will be the children of a parent

  //because that's how the REST queries are structured  

  //TODO: Refactor

  // const entities = boundaryData.map(nodeDepth).map((node) => {  
  //   return computeRouterPathForEntity(node, boundaryDetails)
  // })  

  // let data = entities.reduce((soFar, entity) => {    
  //   const parentId = getParentId(boundaryData[0])
  //   const id = entity.id
  //   parentId == 1 ? soFar.boundariesByParentId[id] = [] : !soFar.boundariesByParentId[parentId] ? soFar.boundariesByParentId[parentId] = [] : soFar.boundariesByParentId[parentId].push(id)
  //   soFar.boundaryDetails[id] = entity
  //   return soFar

  // }, {boundariesByParentId, boundaryDetails})

  // return data
  // // console.log(data, 'data')

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
 
  let boundariesByParentId =  _.omit(state.boundariesByParentId, action.id)
  if (action.parentId) {
    let index = boundariesByParentId[action.parentId].indexOf(action.id)
    boundariesByParentId[action.parentId].splice(index, 1)
  }

  return {
    ...state,
    boundariesByParentId
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
