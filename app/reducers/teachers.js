const INITIAL_STATE = {
  fetching: null,
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

    default:
      return state;
  }
};

export { Teachers };
