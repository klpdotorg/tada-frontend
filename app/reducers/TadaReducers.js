import AppConstants from '../constants/AppConstants';

var initialState = {}
var ActionTypes = AppConstants.ActionTypes;

export function schoolSelectionReducer(state = initialState, action) {
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

export function entityStateReducer(state = initialState, action){
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
