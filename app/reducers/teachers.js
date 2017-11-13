import { SET_EDIT_TEACHER_ID } from '../actions/types';

const INITIAL_STATE = {
  fetching: null,
  editTeacherId: null,
  teachers: { 39: [1, 3] },
};

const Teachers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FECHING_TEACHERS': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'TEACHER_FETCHED': {
      return {
        ...state,
        fetching: false,
        teachers: action.payload,
      };
    }
    case 'ADD_TEACHER': {
      const teachersByInstitution = [...state.teachers[action.institution], action.id];

      const teacherVals = {
        ...state.teachers,
        ...{ [action.institution]: teachersByInstitution },
      };

      return {
        ...state,
        teacherVals,
      };
    }
    case SET_EDIT_TEACHER_ID: {
      return {
        ...state,
        editTeacherId: action.value,
      };
    }

    default:
      return state;
  }
};

export { Teachers };
