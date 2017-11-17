import {
  SET_ASSESSMENTS,
  SHOW_ASSESSMENT_LOADING,
  CLOSE_ASSESSMENT_LOADING,
  SET_ASSESSMENT,
  SET_EDIT_ASSESSMENT_ID,
} from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  assessments: {},
  editAssessmentId: null,
  loading: false,
};

const Assessments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ASSESSMENTS:
      return {
        ...state,
        assessments: { [action.programId]: changeArrayToObject(action.value, 'id') },
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
      const existingAssessments = state.assessments[action.programId];
      const newAssessment = changeArrayToObject(action.value, 'id');
      const assessments = {
        ...existingAssessments,
        ...newAssessment,
      };

      return {
        ...state,
        assessments: {
          [action.programId]: assessments,
        },
      };
    }
    case SET_EDIT_ASSESSMENT_ID:
      return {
        ...state,
        editAssessmentId: action.value,
      };
    default:
      return state;
  }
};

export { Assessments };
