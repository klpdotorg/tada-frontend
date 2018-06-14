import {
  SELECT_PERMISSIONS_BOUNDARY,
  SELECT_PERMISSIONS_USER,
  SELECT_PERMISSIONS_ASSESSMENT,
  LOADING_BOUNDARY_ASSESSMENT,
  SET_BOUNDARY_ASSESSMENTS,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  selectedBoundaries: [],
  selectedUsers: [],
  selectedAssessments: [],
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
    case SELECT_PERMISSIONS_USER:
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
    case SELECT_PERMISSIONS_ASSESSMENT:
      return {
        ...state,
        selectedAssessments: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Permissions };
