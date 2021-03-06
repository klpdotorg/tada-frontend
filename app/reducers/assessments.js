import {
  SET_ASSESSMENTS,
  SHOW_ASSESSMENT_LOADING,
  CLOSE_ASSESSMENT_LOADING,
  SET_ASSESSMENT,
  SET_EDIT_ASSESSMENT_ID,
  SELECT_ASSESSMENT,
  CREATE_ASSESSMENT_ERROR,
  RESET,
} from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  assessments: {},
  editAssessmentId: null,
  loading: false,
  selectedAssessments: [],
  error: {},
};

const Assessments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ASSESSMENTS:
      return {
        ...state,
        assessments: changeArrayToObject(action.value, 'id'),
      };
    case SHOW_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_ASSESSMENT: {
      const newAssessment = { [action.value.id]: action.value };
      return {
        ...state,
        assessments: {
          ...state.assessments,
          ...newAssessment,
        },
      };
    }
    case SET_EDIT_ASSESSMENT_ID:
      return {
        ...state,
        editAssessmentId: action.value,
      };
    case SELECT_ASSESSMENT:
      return {
        ...state,
        selectedAssessments: action.value,
      };
    case CREATE_ASSESSMENT_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Assessments };
