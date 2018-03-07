import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { checkStatus, get } from './requests';

import {
  SERVER_API_BASE as serverApiBase,
  SERVER_AUTH_BASE as authApiBase,
  REPORTS_EMAIL as reportsEmail,
  DEFAULT_PARENT_ID,
} from 'config';
import { urls as Urls, roles as ROLES } from '../constants';
import _ from 'lodash';
import { boundaryType, genUrl } from './utils';
import { computeRouterPathForEntity } from '../reducers/utils';
import { SET_PARENT_NODE } from './types';

export const setParentNode = (value) => {
  return {
    type: SET_PARENT_NODE,
    value,
  };
};

export const selectPrimaryTree = () => {
  return {
    type: 'PRIMARY_SELECTED',
  };
};

export const toggleNode = (id) => {
  return {
    type: 'TOGGLE_NODE',
    id,
  };
};

export const closePeerNodes = (id, depth) => {
  return {
    type: 'CLOSE_PEER_NODES',
    id,
    depth,
  };
};

export const openNode = (id) => {
  return {
    type: 'TOGGLE_NODE',
    id,
    open: true,
  };
};

export const selectPreschoolTree = () => {
  return {
    type: 'PRESCHOOL_SELECTED',
  };
};

function requestDataFromServer() {
  return {
    type: 'REQUEST_SENT',
  };
}

export const responseReceivedFromServer = (resp) => {
  return {
    type: 'BOUNDARIES_FULFILLED',
    payload: resp,
  };
};

export const requestFailed = (error) => {
  return {
    type: 'REQUEST_FAILED',
    statusCode: error.response.status,
    statusText: error.response.statusText,
    error: error.response,
  };
};

export function requestLogin(username) {
  return {
    type: 'LOGIN_REQUESTED',
    username,
  };
}

export function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    authenticated: true,
    auth_token: data.auth_token,
    id: data.user_id,
  };
}

export function removeBoundary(id, parentId) {
  return {
    type: 'REMOVE_BOUNDARY',
    id,
    parentId,
  };
}

function loginError() {
  return {
    type: 'LOGIN_FAILED',
    error: true,
    authenticated: false,
  };
}

export function userRegistrationSuccess(response) {
  return {
    type: 'USER_REGISTERED_SUCCESS',
    registered: true,
    error: false,
    username: response.username,
    email: response.email,
    id: response.id,
  };
}

// Write user registration failure case

function requestLogout() {
  return {
    type: 'LOGOUT',
  };
}

function userDataFetched(data) {
  return {
    type: 'USER_DATA_FETCHED',
    username: data.username,
    email: data.email,
    groups: data.groups,
    id: data.id,
    permissions: data.permissions,
    first_name: data.first_name,
    last_name: data.last_name,
  };
}

export const studentsFetched = (data, groupId) => {
  'STUDENTS_FETCHED', data, groupId;
};

export function fetchBoundaryDetails(parentBoundaryId = 1) {
  return function (dispatch, getState) {
    var requestBody = {};
    var boundaryType = -1;
    if (getState().schoolSelection.primarySchool) {
      boundaryType = 1;
    } else {
      boundaryType = 2;
    }
    requestBody = {
      parent: parentBoundaryId,
      boundary_type: boundaryType,
    };
    // Send info about the whole request so we can track failure
    dispatch(requestDataFromServer());
    return fetch(`${serverApiBase}boundaries/?parent=${parentBoundaryId}&limit=500`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(responseReceivedFromServer(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(requestFailed(error));
      });
  };
}

export const getInstitutions = (parentId) => {
  return get(`${serverApiBase}institutions/?boundary=${parentId}`);
};

export const getStudent = (params) => {
  return get(`${serverApiBase}institutions/${params.institution}/studentgroups/${params.studentgroup}/students/${params.student}`);
};

export const getStudentGroup = (params) => {
  return get(`${serverApiBase}institutions/${params.institution}/studentgroups/${params.studentgroup}`);
};

// Method fetches institutions belonging to a particular Id from the institutions endpoint

export const getStudentGroups = (institutionId) => {
  return get(`${serverApiBase}institutions/${institutionId}/studentgroups/`);
};

export function fetchStudentGroups(institutionId) {
  return function (dispatch, getState) {
    var url = `${serverApiBase}institutions/${institutionId}/studentgroups/`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then(checkStatus)
      .then((data) => {
        dispatch(responseReceivedFromServer(data));
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
  };
}

export const getStudents = (institutionId, classId) => {
  return get(`${serverApiBase}institutions/${institutionId}/studentgroups/${classId}/students/`);
};

export function fetchStudentsByGroupId(groupId) {
  return function (dispatch, getState) {
    dispatch({
      type: 'REQUEST_SENT',
    });
    const state = getState();
    var url = `${serverApiBase}studentgroups/${groupId}/students/`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then(checkStatus)
      .then((data) => {
        dispatch({
          type: 'STUDENTS_FULFILLED',
          payload: { students: data, groupId },
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
        dispatch(requestFailed(error));
      });
  };
}

export function fetchEntitiesFromServer(parentBoundaryId) {
  return function (dispatch, getState) {
    const state = getState();
    return dispatch(boundaryType(parentBoundaryId, state.boundaries.boundaryDetails)(parentBoundaryId));
  };
}

export function fetchUserData(token) {
  return function (dispatch, getState) {
    sessionStorage.setItem('isAdmin', true);
    // return fetch(Urls.USERS + sessionStorage.userid + '/', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: 'Token ' + token,
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(checkStatus)
    //   .then(data => {
    //     data.groups.map((item, index) => {
    //       //console.log(item);
    //       if (item.name == ROLES.ADMIN) sessionStorage.setItem('isAdmin', true);
    //     });
    //     dispatch(userDataFetched(data));
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //     dispatch(requestFailed(error));
    //   });
  };
}

export function sendRegisterUser(email, password, username) {
  return function (dispatch, getState) {
    return fetch(Urls.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .then((data) => {
        dispatch(userRegistrationSuccess(data));
        // dispatch(fetchUserData(sessionStorage.token))
        // dispatch(push('/'))
      })
      .catch((error) => {
        // dispatch(loginError(error));
        console.error('request failed', error);
      });
  };
}

export const toggleModal = (modalType) => {
  return {
    type: 'TOGGLE_MODAL',
    modal: `${modalType}`,
  };
};

// export function deleteBoundary(boundaryid, parentId) {
//   return function (dispatch, getState) {
//     return fetch(`${serverApiBase}boundaries/${boundaryid}/`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Token ${sessionStorage.token}`,
//       },
//     })
//       .then((response) => {
//         if (response.status >= 200 && response.status < 300) {
//           if (parentId == 1) {
//             dispatch(push('/'));
//           } else {
//             let parent = getState().boundaries.boundaryDetails[parentId];
//             dispatch(push(parent.path));
//           }
//           dispatch(removeBoundary(boundaryid, parentId));
//         } else {
//           const error = new Error(response.statusText);
//           error.response = response;
//           throw error;
//         }
//       })
//       .catch((error) => {
//         console.log('request failed', error);
//       });
//   };
// }

export const newBoundaryFetch = (options) => {
  return fetch(`${serverApiBase}boundaries/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  }).catch((error) => {
    console.log('request failed', error);
  });
};
