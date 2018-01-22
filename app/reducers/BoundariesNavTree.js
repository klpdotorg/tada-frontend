import {
  SET_BOUNDARIES,
  REMOVE_EXISTING_BOUNDARIES_NODE,
  UNCOLLAPSED_BOUNDARIES,
} from '../actions/types';

const INITIAL_STATE = {
  boundaryDetails: {
    '2state': {
      id: 2,
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
    default:
      return state;
  }
};

export { BoundariesNavTree };
