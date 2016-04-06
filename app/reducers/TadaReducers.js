import AppConstants from '../constants/AppConstants';
import {combineReducers} from 'redux';

var ActionTypes = AppConstants.ActionTypes;

export function schoolSelection(state = {schoolTypeSelection: 'PRIMARY_SELECTED'}, action) {
  switch (action.type) {
    case ActionTypes.PRIMARY_SELECTED:
      console.log("Primary selected in reducer");
      return Object.assign({}, state, {
        schoolTypeSelection: action.type
      })
    case ActionTypes.PRESCHOOL_SELECTED:
    	return Object.assign({}, state, {
        schoolTypeSelection: action.type
      })
    default:
      return state
  }
  return state;
}

/*
Method computes the router path for an entity and returns it
*/
function computeRouterPathForEntity(entity, boundaryDetails)
{
  var parentEntityId = entity.parent;
  var path = '';
  if(parentEntityId == 1)
  {
     path="/district/" + entity.id;
  }
  else
  {
    var parent = boundaryDetails[entity.parent];
    
    if(entity.boundary_category == "10")
    {
      //path is parent's path plus child's
      
      path = parent.path + "/block/" + entity.id;
    }
    else if(entity.boundary_category == "11")
    {
     
      path = parent.path + "/cluster/" + entity.id;
    }
    else
    {
      path = parent.path + "/institution/" + entity.id
    }
  }
  entity.path = path;
  return entity;
}

function processBoundaryDetails(boundaryData, boundariesByParentId, boundaryDetails)
{
 
  var boundaryInformation = {}
  //Making an assumption that the entire set will be the children of a parent
  
  //because that's how the REST queries are structured 
  
  var parentId = boundaryData[0].parent;
  boundaryData.map(boundary =>{
    var id = boundary.id;
    
    //Special case the districts because they are top level entities and they have no parents. If
    
    //parent is 1, then just enter the results as the keys in the object

    boundary = computeRouterPathForEntity(boundary, boundaryDetails)

    if(parentId == 1)
    {
      boundariesByParentId[id]=[];
    }
    else
    { 
      if(!boundariesByParentId[parentId])
      {
        boundariesByParentId[parentId]=[];
      }
      else
        boundariesByParentId[parentId].push(boundary.id);
    }
    boundaryInformation[id]=boundary;
  })
  /*
    results.reduce(function(soFar, currentValue){
      soFar[currentValue.parent] = currentValue.id;
      return soFar;
    })
  */
  var mergedBoundaryDetails = {}
  Object.assign(mergedBoundaryDetails, boundaryDetails, boundaryInformation);
  return {boundaryDetails: mergedBoundaryDetails, boundariesByParentId: boundariesByParentId}; 
}

export function entities(state = {boundariesByParentId: {}, boundaryDetails: []}, action){
  switch(action.type) {
    case 'REQUEST_SENT':
        return {...state,isFetching: true}
    case 'RESPONSE_RECEIVED':
        console.log("Received entities", action.data);   
        return Object.assign({},state, processBoundaryDetails(action.data, state.boundariesByParentId, state.boundaryDetails))
    case 'REQUEST_FAILED':
        console.log("Server request failed", action.error);
        return { ...state, error: action.error, statusCode: action.statusCode, statusText: action.statusText, isFetching: false}
    default:
        return state;
  }
}

export function login(state={authenticated: false, isLoggingIn: false, error: false, token: ''}, action){
  switch(action.type) {
    case 'REQUEST_LOGIN':
      return Object.assign({}, state, {
          authenticated: false,
          isLoggingIn: true
        })
    case 'LOGIN_FAILED':
      return Object.assign({}, state, {
        authenticated: action.authenticated,
        isLoggingIn: false,
        error: true
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        authenticated: action.authenticated,
        token: action.auth_token,
        isLoggingIn: false,
        error: false
      })

    default:
      return state;
  }

}

