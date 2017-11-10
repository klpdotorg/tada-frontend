import { SELECT_STUDENT_IN_VIEW_STUDENTS, SET_EDIT_STUDENT_ID } from '../actions/types';

const INITIAL_STATE = {
  selectedStudents: [],
  editStudentId: null,
};

const Students = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STUDENT_IN_VIEW_STUDENTS:
      return { ...state, selectedStudents: [...state.selectedStudents, action.value] };
    case SET_EDIT_STUDENT_ID:
      return { ...state, editStudentId: action.value };
    default:
      return state;
  }
};

export { Students };
