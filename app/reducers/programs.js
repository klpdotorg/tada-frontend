import {
  SET_PROGRAMS,
  SET_PROGRAM,
  SELECT_PROGRAM,
  SET_EDIT_PROGRAM_ID,
  SHOW_PROGRAMS_LOADING,
  CLOSE_PROGRAMS_LOADING,
} from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  programs: {},
  editProgramId: null,
  selectedProgram: null,
  loading: false,
};

const Programs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROGRAMS:
      return {
        ...state,
        programs: changeArrayToObject(action.value, 'id'),
      };
    case SET_PROGRAM:
      return {
        ...state,
        programs: { ...state.programs, ...action.value },
      };
    case SET_EDIT_PROGRAM_ID:
      return {
        ...state,
        editProgramId: action.value,
      };
    case SELECT_PROGRAM:
      return {
        ...state,
        selectedProgram: action.value,
      };
    case SHOW_PROGRAMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_PROGRAMS_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export { Programs };
