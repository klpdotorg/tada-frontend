import {
  SELECT_STUDENT_IN_VIEW_STUDENTS,
  SET_EDIT_STUDENT_ID,
  SET_STUDENTS,
  SET_STUDENT,
} from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  selectedStudents: [],
  students: {},
  editStudentId: null,
};

const Students = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return {
        ...state,
        students: changeArrayToObject(action.value, 'id'),
      };
    case SET_STUDENT:
      return {
        ...state,
        students: {
          ...state.students,
          ...{
            [action.value.id]: action.value,
          },
        },
      };
    case SELECT_STUDENT_IN_VIEW_STUDENTS:
      return { ...state, selectedStudents: [...state.selectedStudents, action.value] };
    case SET_EDIT_STUDENT_ID:
      return { ...state, editStudentId: action.value };
    default:
      return state;
  }
};

export { Students };
