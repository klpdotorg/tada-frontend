import omit from 'lodash.omit';
import {
  SET_BOUNDARIES,
  REMOVE_EXISTING_BOUNDARIES_NODE,
  UNCOLLAPSED_BOUNDARIES,
  RESET_BOUNDARY_NAV_TREE,
  DELETE_BOUNDARY_NODE,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  boundaryDetails: {
    '2state': {
      id: 2,
      boundary_type: 'ST',
    },
  },
  boundariesByParentId: {},
  uncollapsedEntities: {},
};

const BoundariesNavTree = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOUNDARIES:
      return {
        ...state,
        boundaryDetails: {
          ...state.boundaryDetails,
          ...action.boundaryDetails,
        },
        boundariesByParentId: {
          ...state.boundariesByParentId,
          ...action.boundariesByParentId,
        },
      };
    case UNCOLLAPSED_BOUNDARIES:
      return {
        ...state,
        uncollapsedEntities: action.value,
      };
    case REMOVE_EXISTING_BOUNDARIES_NODE:
      return {
        ...state,
        boundariesByParentId: {
          ...state.boundariesByParentId,
          ...{
            [action.value]: [],
          },
        },
      };
    case RESET_BOUNDARY_NAV_TREE:
      return {
        ...state,
        uncollapsedEntities: {},
        boundariesByParentId: {},
      };
    case DELETE_BOUNDARY_NODE:
      return {
        ...state,
        boundaryDetails: omit(state.boundaryDetails, action.value),
        boundariesByParentId: omit(state.boundariesByParentId, action.value),
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { BoundariesNavTree };
