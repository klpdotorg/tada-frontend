import { SET_PROGRAMS, SET_PROGRAM, SELECT_PROGRAM, SET_EDIT_PROGRAM_ID } from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  programs: {},
  editProgramId: null,
  selectedProgram: null,
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
    default:
      return state;
  }
};

export { Programs };
