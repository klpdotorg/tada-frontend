import omit from 'lodash.omit';

import {
  TEACHER_FETCHED,
  SET_EDIT_TEACHER_ID,
  SHOW_TEACHER_LOADING,
  CLOSE_TEACHER_LOADING,
  SET_TEACHER,
  DELETE_TEACHER,
  RESET,
  SET_TEACHER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  editTeacherId: null,
  loading: false,
  teachers: {},
  error: {},
};

const Teachers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEACHER_FETCHED: {
      return {
        ...state,
        teachers: action.value,
      };
    }
    case SHOW_TEACHER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_TEACHER_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_EDIT_TEACHER_ID: {
      return {
        ...state,
        editTeacherId: action.value,
      };
    }
    case DELETE_TEACHER:
      return {
        ...state,
        teachers: omit(state.teachers, action.value),
      };
    case SET_TEACHER:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          ...action.value,
        },
      };
    case SET_TEACHER_ERROR:
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

export { Teachers };
