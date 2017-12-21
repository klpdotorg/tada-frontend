import {
  SET_ASSESSMENT_ENTRY_STUDENTS,
  SET_ASSESSMENT_ENTRY_QUESTIONS,
  SET_ASSESSMENT_ENTRY_ANSWERS,
  RESET_ASSESSMENTR_ENTRY,
} from '../actions/types';

const INITIAL_STATE = {
  answers: [],
  questions: [],
  students: [],
};

const AssessmentEntry = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ASSESSMENT_ENTRY_STUDENTS:
      return {
        ...state,
        students: [...state.students, ...[action.value]],
      };
    case SET_ASSESSMENT_ENTRY_QUESTIONS:
      return {
        ...state,
        questions: action.value,
      };
    case SET_ASSESSMENT_ENTRY_ANSWERS:
      return {
        ...state,
        answers: action.value,
      };
    case RESET_ASSESSMENTR_ENTRY:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { AssessmentEntry };
