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

export function entities(state = {}, action){
  switch(action.type) {
    case 'REQUEST_ENTITIES':
        console.log("Requesting entities");
        return state;
    case 'RECEIVE_ENTITIES':
        console.log("Received entities", action.entities);
        return state;
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

