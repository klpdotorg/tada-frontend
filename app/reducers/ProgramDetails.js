import {
  UNCOLLAPSED_PROGRAM_ENTITY,
  SET_FITLER_PROGRAM_ENTITIES,
  REMOVE_EXISTING_NODE,
  RESET_PROGRAM_NAV_TREE,
} from '../actions/types';

const INITIAL_STATE = {
  programDetails: {
    '1state': {
      id: 1,
      boundary_type: 'ST',
    },
  },
  entitiesByParentId: {},
  uncollapsedEntities: {},
};

const ProgramDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FITLER_PROGRAM_ENTITIES:
      return {
        ...state,
        programDetails: {
          ...state.programDetails,
          ...action.programDetails,
        },
        entitiesByParentId: {
          ...state.entitiesByParentId,
          ...action.entitiesByParentId,
        },
      };
    case UNCOLLAPSED_PROGRAM_ENTITY:
      return {
        ...state,
        uncollapsedEntities: action.value,
      };
    case REMOVE_EXISTING_NODE:
      return {
        ...state,
        entitiesByParentId: {
          ...state.entitiesByParentId,
          ...{
            [action.value]: [],
          },
        },
      };
    case RESET_PROGRAM_NAV_TREE:
      return {
        ...state,
        entitiesByParentId: {},
        uncollapsedEntities: {},
      };
    default:
      return state;
  }
};

export { ProgramDetails };
