import { SELECT_STUDENT_IN_VIEW_STUDENTS } from '../actions/types';

const INITIAL_STATE = {
  selectedStudents: [],
};

const Students = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STUDENT_IN_VIEW_STUDENTS:
      return { ...state, selectedStudents: [...state.selectedStudents, action.value] };
    default:
      return state;
  }
};

export { Students };
