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

function computeRouterPathForEntity(entity)
{
  var parentEntityId = entity.parent;
  if(parentEntityId == 1)
  {
     path="/district/" + boundary.id;
  }
  
}

function processBoundaryDetails(boundaryData)
{
  var boundaryInformation = {};
  boundaryData.map(boundary =>{
    var id = boundary.id;
    boundaryInformation[id]=boundary
  })
  return boundaryInformation; 
}

export function entities(state = {boundariesByParentId: [], boundaryDetails: []}, action){
  switch(action.type) {
    case 'REQUEST_SENT':
        return {...state,isFetching: true}
    case 'RESPONSE_RECEIVED':
        console.log("Received entities", action.data);        
        return { ...state, boundaryDetails: processBoundaryDetails(action.data)}
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

