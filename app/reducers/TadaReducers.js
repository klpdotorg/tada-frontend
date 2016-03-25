import AppConstants from '../constants/AppConstants';
import {combineReducers} from 'redux';

var initialState = {
  authenticated: false,
  schoolTypeSelection: 'PRIMARY_SELECTED',
  isLoggingIn: false
}

var ActionTypes = AppConstants.ActionTypes;

function schoolSelectionReducer(state = initialState, action) {
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

function entityStateReducer(state = initialState, action){
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

function loginStateReducer(state=initialState, action){
  switch(action.type) {
    case 'REQUEST_LOGIN':
      return Object.assign({}, state, {
          authenticated: false,
          isLoggingIn: true
        })
    case 'LOGIN_FAILED':
      return Object.assign({}, state, {
        authenticated: action.authenticated,
        isLoggingIn: false
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        authenticated: action.authenticated,
        token: action.auth_token,
        isLoggingIn: false
      })

    default:
      return state;
  }

}

const rootReducer = combineReducers({
  schoolSelectionReducer,
  entityStateReducer,
  loginStateReducer
})

export default rootReducer;
