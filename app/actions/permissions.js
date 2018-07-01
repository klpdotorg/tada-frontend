import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';
import omit from 'lodash.omit';

import { fetchBoundary, showBoundaryLoading, toggleSubmitLoading } from './index';
import { getPath } from '../utils';
import {
  SELECT_PERMISSIONS_BOUNDARY,
  SELECT_PERMISSIONS_USER,
  SELECT_PERMISSIONS_ASSESSMENT,
  SET_USER_PERMISSIONS,
  LOADING_BOUNDARY_ASSESSMENT,
  SET_BOUNDARY_ASSESSMENTS,
} from './types';
import { get, post } from './requests';
import { permissionAssigned } from './notifications';

const loadingBoundaryAssessment = (value) => {
  return {
    type: LOADING_BOUNDARY_ASSESSMENT,
    value,
  };
};

export const openPermissionBoundary = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);
    dispatch({
      type: SET_BOUNDARY_ASSESSMENTS,
      value: {},
    });
    dispatch({
      type: SELECT_PERMISSIONS_BOUNDARY,
      value: [],
    });
    dispatch(push(`/permissions${path}`));
  };
};

export const fetchBoundariesForPermission = (params) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(fetchBoundary(params));
  };
};

export const fetchBoundaryAssessments = (entity) => {
  return (dispatch, getState) => {
    dispatch(loadingBoundaryAssessment(true));
    const state = getState();
    const { assessments } = state.permissions;
    const url = `${SERVER_API_BASE}boundary/questiongroup-map/?boundary_ids=${entity.id}`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_BOUNDARY_ASSESSMENTS,
        value: { ...assessments, ...{ [entity.id]: data.results } },
      });
      dispatch(loadingBoundaryAssessment(false));
    });
  };
};

export const selectPermissionsBoundary = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedBoundaries, assessments } = state.permissions;
    if (!selectedBoundaries.includes(id)) {
      dispatch(fetchBoundaryAssessments({ id }));
      dispatch({
        type: SELECT_PERMISSIONS_BOUNDARY,
        value: [...selectedBoundaries, id],
      });
    } else {
      dispatch({
        type: SELECT_PERMISSIONS_BOUNDARY,
        value: selectedBoundaries.filter((val) => {
          return val !== id;
        }),
      });
      dispatch({
        type: SET_BOUNDARY_ASSESSMENTS,
        value: omit(assessments, id),
      });
    }
  };
};

export const selectPermissionsUser = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedUsers } = state.permissions;
    if (!selectedUsers.includes(id)) {
      dispatch({
        type: SELECT_PERMISSIONS_USER,
        value: [...selectedUsers, id],
      });
    } else {
      dispatch({
        type: SELECT_PERMISSIONS_USER,
        value: selectedUsers.filter((val) => {
          return val !== id;
        }),
      });
    }
  };
};

export const selectPermissionsAssessment = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedAssessments } = state.permissions;
    if (!selectedAssessments.includes(id)) {
      dispatch({
        type: SELECT_PERMISSIONS_ASSESSMENT,
        value: [...selectedAssessments, id],
      });
    } else {
      dispatch({
        type: SELECT_PERMISSIONS_ASSESSMENT,
        value: selectedAssessments.filter((val) => {
          return val !== id;
        }),
      });
    }
  };
};

export const fetchUserPermissions = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { id } = state.profile;
    const url = `${SERVER_API_BASE}users/${id}/permissions/`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_USER_PERMISSIONS,
        value: data,
      });
    });
  };
};

export const submitBoundaryPermissions = () => {
  return (dispatch, getState) => {
    dispatch(toggleSubmitLoading());
    const state = getState();
    const { selectedBoundaries, selectedUsers } = state.permissions;
    const promises = selectedUsers.map((user) => {
      const url = `${SERVER_API_BASE}users/${user}/permissions/`;
      return post(url, {
        boundary_id: selectedBoundaries,
      });
    });

    Promise.all(promises).then(() => {
      dispatch({
        type: SELECT_PERMISSIONS_BOUNDARY,
        value: [],
      });
      dispatch(Notifications.success(permissionAssigned(
        'Permission Assigned',
        'Boundary permissions are successfully assigned.',
      )));
      dispatch(toggleSubmitLoading());
    });
  };
};

export const submitAssessmentPermissions = () => {
  return (dispatch, getState) => {
    dispatch(toggleSubmitLoading());
    const state = getState();
    const { selectedAssessments, selectedUsers } = state.permissions;
    const promises = selectedUsers.map((user) => {
      const url = `${SERVER_API_BASE}users/${user}/permissions/`;
      return post(url, {
        assessment_id: selectedAssessments,
      });
    });

    Promise.all(promises).then(() => {
      dispatch({
        type: SELECT_PERMISSIONS_ASSESSMENT,
        value: [],
      });
      dispatch(Notifications.success(permissionAssigned(
        'Permission Assigned',
        'Assessment permissions are successfully assigned.',
      )));
      dispatch(toggleSubmitLoading());
    });
  };
};
