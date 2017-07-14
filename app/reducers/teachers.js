const INITIAL_STATE = {
  fetching: null,
  teachers: {},
};

export function teachers(state = INITIAL_STATE, action) {
  try {
    switch (action.type) {
      case 'FECHING_TEACHERS': {
        console.log('fetching data.......');
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
        const teachersByInstitution = [
          ...state.teachers[action.teacher.institution],
          action.teacher,
        ];

        const teachers = {
          ...state.teachers,
          ...{ [action.teacher.institution]: teachersByInstitution },
        };

        return {
          ...state,
          teachers,
        };
      }

      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}
