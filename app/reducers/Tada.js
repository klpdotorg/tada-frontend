import { combineReducers } from 'redux';
import { TOGGLE_SIDE_NAV } from '../actions/TadaActionCreators';
import merge from 'lodash/object/merge'

export function tada(state = {sideNavExpanded: true}, action) {
  switch (action.type) {
    case TOGGLE_SIDE_NAV:
      return merge({}, state, {
        sideNavExpanded: !state.sideNavExpanded
      })

    default:
      return state
  }
}

const tadaApp = combineReducers({
  tada
});

export default tadaApp;
