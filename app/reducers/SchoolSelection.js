import { RESET } from '../actions/types';

const INITIAL_STATE = {
  primarySchool: true,
};

const SchoolSelection = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PRIMARY_SELECTED':
      return {
        primarySchool: true,
      };
    case 'PRESCHOOL_SELECTED':
      return {
        primarySchool: false,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { SchoolSelection };
