import AppConstants from '../constants/AppConstants';

var initialState = {}
var ActionTypes = AppConstants.ActionTypes;

export function tadaReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PRIMARY_SELECTED:
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
