import { SERVER_API_BASE, PER_PAGE } from 'config';
import { push } from 'react-router-redux';
import pull from 'lodash.pull';
import omit from 'lodash.omit';
import getObject from 'lodash.get';
import Notifications from 'react-notification-system-redux';

import { get, patch, deleteRequest } from './requests';
import { convertEntitiesToObject, getPath, getEntityDepth } from '../utils';
import {
  SET_BOUNDARIES,
  REMOVE_EXISTING_BOUNDARIES_NODE,
  UNCOLLAPSED_BOUNDARIES,
  DELETE_BOUNDARY_NODE,
  SET_EDIT_BOUNDARY_ERROR,
  SET_CREATE_BOUNDARY_ERROR,
  SELECT_BOUNDARY,
} from './types';
import {
  showBoundaryLoading,
  closeBoundaryLoading,
  closeConfirmModal,
  toggleSpinner,
} from './index';
import { errorNotification, showSuccessMessage } from './notifications';

export const showEditBoundaryError = (error) => {
  return (dispatch) => {
    dispatch({
      type: SET_EDIT_BOUNDARY_ERROR,
      value: error,
    });
    dispatch(Notifications.error(errorNotification('Error!', 'Boundary not saved.')));
  };
};

export const showCreateBoundaryError = (error) => {
  return (dispatch) => {
    dispatch({
      type: SET_CREATE_BOUNDARY_ERROR,
      value: error,
    });
    dispatch(Notifications.error(errorNotification('Error!', 'Boundary not saved.')));
  };
};

export const resetCreateBoundaryError = () => {
  return {
    type: SET_CREATE_BOUNDARY_ERROR,
    value: {},
  };
};

export const resetEditBoundaryError = () => {
  return {
    type: SET_EDIT_BOUNDARY_ERROR,
    value: {},
  };
};

export const removeEntity = (params) => {
  return (dispatch, getState) => {
    const { parentId, boundaryNodeId } = params;
    const state = getState();
    const parentEntity = state.boundaries.boundaryDetails[parentId];
    const parentDepth = getEntityDepth(parentEntity);
    const path = getPath(state, parentId, parentDepth);

    const boundariesByParentId = {
      ...state.boundaries.boundariesByParentId,
      [parentDepth]: pull(state.boundaries.boundariesByParentId[parentDepth], boundaryNodeId),
    };
    const newUnCollapsedEntities = omit(state.boundaries.uncollapsedEntities, parentDepth + 1);
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
    dispatch(resetEditBoundaryError());
    dispatch({
      type: SELECT_BOUNDARY,
      value: uniqueId,
    });
  };
};

export const setBoundaries = (data) => {
  return {
    type: SET_BOUNDARIES,
    payload: data,
  };
};

const getUrlForBoundary = (entity, stateCode) => {
  if (entity.depth < 3) {
    return `${SERVER_API_BASE}boundaries/?parent=${entity.id}&state=${stateCode}&per_page=0`;
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
    const { state_code } = state.profile;

    const url = getUrlForBoundary(
      {
        depth: entity.depth,
        id: boundary.id,
      },
      state_code,
    );

    get(url).then(({ data }) => {
      const entities = convertEntitiesToObject(data.results);
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
    const currentNode = getObject(uncollapsedEntities, entity.depth);
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
      const currentNode = getObject(uncollapsedEntities, entity.depth);
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
    dispatch(toggleSpinner(true));

    patch(`${SERVER_API_BASE}boundaries/${boundaryId}/`, { name })
      .then((response) => {
        if (response.status === 200) {
          const entities = convertEntitiesToObject([response.data]);

          dispatch({
            type: SET_BOUNDARIES,
            boundaryDetails: entities,
          });
          dispatch(resetEditBoundaryError());
          dispatch(Notifications.success(showSuccessMessage('Boundary Modified!', 'Boundary modified successfully.')));
        } else {
          dispatch(showEditBoundaryError(response.data));
        }
        dispatch(toggleSpinner(false));
      })
      .catch((error) => {
        console.log(error, 'Printing the error over here');
      });
  };
};

export const deleteBoundary = (params) => {
  return (dispatch) => {
    const { boundaryId } = params;
    dispatch(showBoundaryLoading());
    dispatch(closeConfirmModal());

    const url = `${SERVER_API_BASE}boundaries/${boundaryId}/`;

    deleteRequest(url)
      .then((data) => {
        if (data.status === 204) {
          dispatch(removeEntity(params));
          dispatch(Notifications.success(showSuccessMessage('Boundary Deleted!', 'Boundary successfully deleted!')));
        } else {
          dispatch(Notifications.error(errorNotification('Error!', 'Boundary not deleted!')));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
