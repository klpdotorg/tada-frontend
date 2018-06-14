import { SET_USER_PERMISSIONS, RESET } from '../actions/types';

const INITIAL_STATE = {
  boundaries: [],
  assessments: [],
  institutions: [],
};

const UserPermissions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_PERMISSIONS:
      return {
        ...state,
        ...action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { UserPermissions };
