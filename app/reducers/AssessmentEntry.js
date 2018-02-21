import {
  SET_ASSESSMENT_ENTRY_BOUNDARIES,
  SET_ASSESSMENT_ENTRY_QUESTIONS,
  SET_ASSESSMENT_ENTRY_ANSWERS,
  RESET_ASSESSMENTR_ENTRY,
  SELECT_PROGRAM_ASSESSMENT,
} from '../actions/types';

const INITIAL_STATE = {
  selectedProgramAssess: {},
  answers: {},
  boundaryIds: [],
};

const AssessmentEntry = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ASSESSMENT_ENTRY_BOUNDARIES:
      return {
        ...state,
        boundaryIds: action.value,
      };
    case SET_ASSESSMENT_ENTRY_QUESTIONS:
      return {
        ...state,
        questions: action.value,
      };
    case SET_ASSESSMENT_ENTRY_ANSWERS: {
      const answers = state.answers[action.id];

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.id]: {
            ...answers,
            ...action.value,
          },
        },
      };
    }
    case SELECT_PROGRAM_ASSESSMENT:
      return {
        ...state,
        selectedProgramAssess: action.value,
      };
    case RESET_ASSESSMENTR_ENTRY:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { AssessmentEntry };
