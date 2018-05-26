import {
  SELECT_PERMISSIONS_BOUNDARY,
  UNSELECT_PERMISSIONS_BOUNDARY,
  SELECT_PERMISSIONS_USER,
  UNSELECT_PERMISSIONS_USER,
  LOADING_BOUNDARY_ASSESSMENT,
  SET_BOUNDARY_ASSESSMENTS,
} from '../actions/types';

const INITIAL_STATE = {
  selectedBoundaries: [],
  selectedUsers: [],
  assessments: {},
  loadingAssessment: false,
};

const Permissions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_PERMISSIONS_BOUNDARY:
      return {
        ...state,
        selectedBoundaries: action.value,
      };
    case UNSELECT_PERMISSIONS_BOUNDARY:
      return {
        ...state,
        selectedBoundaries: action.value,
      };
    case SELECT_PERMISSIONS_USER:
      return {
        ...state,
        selectedUsers: action.value,
      };
    case UNSELECT_PERMISSIONS_USER:
      return {
        ...state,
        selectedUsers: action.value,
      };
    case LOADING_BOUNDARY_ASSESSMENT:
      return {
        ...state,
        loadingAssessment: action.value,
      };
    case SET_BOUNDARY_ASSESSMENTS:
      return {
        ...state,
        assessments: action.value,
      };
    default:
      return state;
  }
};

export { Permissions };
