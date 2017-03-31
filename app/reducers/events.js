import _ from 'lodash';
import store from '../store';

export function appstate(state = {
  singleSelectMode: false,
  selectedBoundary: ""
}, action) {
  switch (action.type) {
    case 'SINGLE_SELECT_MODE':
    return {
      ...state,
      singleSelectMode: true
    }
    case 'BOUNDARY_SELECTED':
    return {
      ...state,
      selectedBoundary: action.boundary
    }
    default:
    return state
  }
}