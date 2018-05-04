import { SERVER_API_BASE, STATE_CODE, PER_PAGE } from 'config';
import { push } from 'react-router-redux';
import _ from 'lodash';

import { get, patch, deleteRequest } from './requests';
import { convertEntitiesToObject, getPath, getEntityDepth } from '../utils';
import {
  SET_BOUNDARIES,
  REMOVE_EXISTING_BOUNDARIES_NODE,
  UNCOLLAPSED_BOUNDARIES,
  DELETE_BOUNDARY_NODE,
} from './types';
import { showBoundaryLoading, closeBoundaryLoading, closeConfirmModal } from './index';

export const removeEntity = (params) => {
  return (dispatch, getState) => {
    const { parentId, boundaryNodeId } = params;
    const state = getState();
    const parentEntity = state.boundaries.boundaryDetails[parentId];
    const parentDepth = getEntityDepth(parentEntity);
    const path = getPath(state, parentId, parentDepth);

    const boundariesByParentId = {
      ...state.boundaries.boundariesByParentId,
      [parentDepth]: _.pull(state.boundaries.boundariesByParentId[parentDepth], boundaryNodeId),
    };
    const newUnCollapsedEntities = _.omit(state.boundaries.uncollapsedEntities, parentDepth + 1);
    dispatch({
      type: SET_BOUNDARIES,
      boundariesByParentId,
    });
    dispatch({
      type: UNCOLLAPSED_BOUNDARIES,
      value: newUnCollapsedEntities,
    });
    dispatch({
      type: DELETE_BOUNDARY_NODE,
      value: boundaryNodeId,
    });
    dispatch(closeBoundaryLoading());
    dispatch(push(path));
  };
};

export const openBoundary = (uniqueId, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, uniqueId, depth);

    dispatch(push(path));
  };
};

export const setBoundaries = (data) => {
  return {
    type: SET_BOUNDARIES,
    payload: data,
  };
};

const getUrlForBoundary = (entity) => {
  if (entity.depth < 3) {
    return `${SERVER_API_BASE}boundaries/?parent=${entity.id}&state=${STATE_CODE}&per_page=${PER_PAGE}`;
  }

  switch (entity.depth) {
    case 3:
      return `${SERVER_API_BASE}institutions/?admin3=${entity.id}&per_page=${PER_PAGE}`;
    case 4:
      return `${SERVER_API_BASE}institutions/${entity.id}/studentgroups/`;
    case 5:
      return `${SERVER_API_BASE}studentgroups/${entity.id}/students/`;
    default:
      return null;
  }
};

export const fetchBoundary = (entity, moreEntities) => {
  return (dispatch, getState) => {
    const state = getState();
    const boundary = state.boundaries.boundaryDetails[entity.uniqueId];

    const url = getUrlForBoundary({
      depth: entity.depth,
      id: boundary.id,
    });

    get(url).then((res) => {
      const entities = convertEntitiesToObject(res.results);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
        boundariesByParentId: { [entity.depth]: Object.keys(entities) },
      });

      if (moreEntities && moreEntities.length) {
        dispatch(fetchBoundaries(moreEntities));
      } else {
        dispatch(closeBoundaryLoading());
      }
    });
  };
};

export const uncollapsedBoundaries = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const { uncollapsedEntities } = state.boundaries;
    const currentNode = _.get(uncollapsedEntities, entity.depth);
    const existing = currentNode === entity.uniqueId;

    if (entity.depth > 0) {
      const depths = Object.keys(uncollapsedEntities).filter((depth) => {
        return !(depth >= entity.depth);
      });

      if (!existing) {
        depths.push(entity.depth);
      }

      const newUnCollapsedEntities = depths.reduce((soFar, depth) => {
        const result = soFar;
        const value = uncollapsedEntities[depth];

        if (!value || depth === entity.depth) {
          result[depth] = entity.uniqueId;
        } else {
          result[depth] = value;
        }

        return result;
      }, {});

      dispatch({
        type: UNCOLLAPSED_BOUNDARIES,
        value: newUnCollapsedEntities,
      });
      dispatch({
        type: REMOVE_EXISTING_BOUNDARIES_NODE,
        value: entity.depth,
      });
    }
  };
};

export const openEntity = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const existingParentIds = state.boundaries.boundariesByParentId[entity.depth - 1];

    existingParentIds.push(entity.uniqueId);
    dispatch({
      type: SET_BOUNDARIES,
      boundariesByParentId: { [entity.depth - 1]: existingParentIds },
    });
    dispatch(uncollapsedBoundaries(entity));
  };
};

const fetchBoundaries = (Ids) => {
  return (dispatch, getState) => {
    if (Ids.length) {
      const state = getState();
      const entity = Ids[0];
      const entities = Ids.slice(1);
      const { uncollapsedEntities } = state.boundaries;
      const currentNode = _.get(uncollapsedEntities, entity.depth);
      const existing = currentNode === entity.uniqueId;

      if (!existing && entity.depth <= 5) {
        dispatch(fetchBoundary(entity, entities));
      } else {
        dispatch(closeBoundaryLoading());
      }

      dispatch(uncollapsedBoundaries(entity));
    }
  };
};

export const getBoundariesEntities = (Ids) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(fetchBoundaries(Ids));
  };
};

export const modifyBoundary = (boundaryId, name) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());

    patch(`${SERVER_API_BASE}boundaries/${boundaryId}/`, { name })
      .then((response) => {
        const entities = convertEntitiesToObject([response]);

        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(closeBoundaryLoading());
      })
      .catch((error) => {});
  };
};

export const deleteBoundary = (params) => {
  return (dispatch) => {
    const { boundaryId } = params;
    dispatch(showBoundaryLoading());
    dispatch(closeConfirmModal());

    const url = `${SERVER_API_BASE}boundaries/${boundaryId}/`;

    deleteRequest(url)
      .then((response) => {
        if (response.status === 204) {
          dispatch(removeEntity(params));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
