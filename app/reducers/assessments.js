import { SET_ASSESSMENTS } from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  assessments: {},
};

const Assessments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ASSESSMENTS:
      return {
        ...state,
        assessments: { [action.programId]: changeArrayToObject(action.value, 'id') },
      };
    default:
      return state;
  }
};

export { Assessments };
