import {
  SET_ASSESSMENT_ENTRY_BOUNDARIES,
  SET_ASSESSMENT_ENTRY_QUESTIONS,
  SET_ASSESSMENT_ENTRY_ANSWERS,
  RESET_ASSESSMENTR_ENTRY,
  SELECT_PROGRAM_ASSESSMENT,
  SHOW_ASSESSMENT_ENTRY_LOADING,
  HIDE_ASSESSMENT_ENTRY_LOADING,
  CHANGE_ASSESSMENT_ENTRY_ANSWERS,
  SHOW_ANSWERS_LOADING,
  HIDE_ANSWERS_LOADING,
  SET_ASSESSMENT_ENTRY_STUDENTS,
  ON_CHANGE_GROUP_VALUE,
  ON_CHANGE_DATE_OF_VISITS,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  selectedProgramAssess: {},
  answers: {},
  boundaryIds: [],
  loading: false,
  answersLoading: false,
  students: [],
  groupValues: {},
  dateOfVisits: {},
};

const AssessmentEntry = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_CHANGE_DATE_OF_VISITS:
      return {
        ...state,
        dateOfVisits: {
          ...state.dateOfVisits,
          ...action.value,
        },
      };
    case ON_CHANGE_GROUP_VALUE:
      return {
        ...state,
        groupValues: {
          ...state.groupValues,
          ...action.value,
        },
      };
    case SET_ASSESSMENT_ENTRY_STUDENTS:
      return {
        ...state,
        students: action.value,
      };
    case SHOW_ANSWERS_LOADING:
      return {
        ...state,
        answersLoading: true,
      };
    case HIDE_ANSWERS_LOADING:
      return {
        ...state,
        answersLoading: false,
      };
    case SHOW_ASSESSMENT_ENTRY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_ASSESSMENT_ENTRY_LOADING:
      return {
        ...state,
        loading: false,
      };
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
    case SET_ASSESSMENT_ENTRY_ANSWERS:
      return {
        ...state,
        answers: action.value,
      };
    case CHANGE_ASSESSMENT_ENTRY_ANSWERS: {
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
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { AssessmentEntry };
