import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { checkStatus, get } from './utils';

import {
  SERVER_API_BASE as serverApiBase,
  SERVER_AUTH_BASE as authApiBase,
  REPORTS_EMAIL as reportsEmail,
} from 'config';
import { urls as Urls, roles as ROLES } from '../constants';
import _ from 'lodash';
import { boundaryType, genUrl } from './utils';
import { computeRouterPathForEntity } from '../reducers/utils';

export const selectPrimaryTree = () => {
  return {
    type: 'PRIMARY_SELECTED',
  };
};

export const toggleNode = id => {
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

export const openNode = id => {
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

export function responseReceivedFromServer(resp) {
  return {
    type: 'BOUNDARIES_FULFILLED',
    payload: resp,
  };
}

function requestFailed(error) {
  console.log('error', error);
  return {
    type: 'REQUEST_FAILED',
    statusCode: error.response.status,
    statusText: error.response.statusText,
    error: error.response,
  };
}

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

//Write user registration failure case

function requestLogout() {
  return {
    type: 'LOGOUT',
  };
}

export function logoutUser() {
  return function(dispatch, getState) {
    return fetch(Urls.LOGOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('isAdmin');
          sessionStorage.removeItem('userid');
          dispatch(push('/logout'));
        }
      })
      .catch(error => {
        console.log(error);
      });
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
  type: 'STUDENTS_FETCHED', data, groupId;
};

export const getBoundaries = parentId => {
  return get(`${serverApiBase}boundaries/?parent=${parentId}&limit=500`);
};

export function fetchBoundaryDetails(parentBoundaryId = 1) {
  return function(dispatch, getState) {
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
    //Send info about the whole request so we can track failure
    dispatch(requestDataFromServer());
    return fetch(serverApiBase + 'boundaries/?parent=' + parentBoundaryId + '&limit=500', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch(responseReceivedFromServer(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailed(error));
      });
  };
}

export const getInstitutions = parentId => {
  return get(`${serverApiBase}institutions/?boundary=${parentId}`);
};

//Method fetches institutions belonging to a particular Id from the institutions endpoint
export function fetchInstitutionDetails(parentBoundaryId) {
  return function(dispatch, getState) {
    var institutionsUrl = serverApiBase + 'institutions/?';
    return fetch(institutionsUrl + 'boundary=' + parentBoundaryId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch(responseReceivedFromServer(data));
      })
      .catch(error => {
        dispatch(requestFailed(error));
      });
  };
}

export const getStudentGroups = institutionId => {
  return get(`${serverApiBase}institutions/${institutionId}/studentgroups/`);
};

export function fetchStudentGroups(institutionId) {
  return function(dispatch, getState) {
    var url = serverApiBase + 'institutions/' + institutionId + '/studentgroups/';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch(responseReceivedFromServer(data));
      })
      .catch(error => {
        dispatch(requestFailed(error));
      });
  };
}

export const getStudents = (institutionId, classId) => {
  return get(`${serverApiBase}institutions/${institutionId}/studentgroups/${classId}/students/`);
};

export function fetchStudentsByGroupId(groupId) {
  return function(dispatch, getState) {
    dispatch({
      type: 'REQUEST_SENT',
    });
    const state = getState();
    var url = serverApiBase + `studentgroups/${groupId}/students/`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch({
          type: 'STUDENTS_FULFILLED',
          payload: { students: data, groupId },
        });
        return data;
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailed(error));
      });
  };
}

export function fetchStudents(institutionId, groupId) {
  return function(dispatch, getState) {
    const state = getState();
    var url = serverApiBase + `institutions/${institutionId}/studentgroups/${groupId}/students/`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch({
          type: 'STUDENTS_FULFILLED',
          payload: { students: data, groupId },
        });
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailed(error));
      });
  };
}

/*
This function decides whether we need to go to the boundaries endpoint or the institutions endpoint or studentgroup/students endpoint for data.
Everything is just one big nav tree in the UI.
*/
export function fetchEntitiesFromServer(parentBoundaryId) {
  return function(dispatch, getState) {
    const state = getState();
    return dispatch(
      boundaryType(parentBoundaryId, state.boundaries.boundaryDetails)(parentBoundaryId),
    );
  };
}

export function fetchUserData(token) {
  return function(dispatch, getState) {
    return fetch(Urls.USERS + sessionStorage.userid + '/', {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(data => {
        data.groups.map((item, index) => {
          //console.log(item);
          if (item.name == ROLES.ADMIN) sessionStorage.setItem('isAdmin', true);
        });
        dispatch(userDataFetched(data));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(requestFailed(error));
      });
  };
}

export function sendRegisterUser(email, password, username) {
  return function(dispatch, getState) {
    return fetch(Urls.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(data => {
        dispatch(userRegistrationSuccess(data));
        //dispatch(fetchUserData(sessionStorage.token))
        //dispatch(push('/'))
      })
      .catch(error => {
        //dispatch(loginError(error));
        console.error('request failed', error);
      });
  };
}

function toggleModal(modalType) {
  return {
    type: 'TOGGLE_MODAL',
    modal: `${modalType}`,
  };
}

export function sendLoginToServer(email, pass) {
  return function(dispatch, getState) {
    return fetch(Urls.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: pass,
      }),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(data => {
        sessionStorage.setItem('token', data.auth_token);
        sessionStorage.setItem('userid', data.user_id);
        dispatch(loginSuccess(data));
        dispatch(fetchUserData(sessionStorage.token));
        dispatch(push('/'));
      })
      .catch(error => {
        dispatch(loginError(error));
        console.error('request failed', error);
      });
  };
}

export function deleteBoundary(boundaryid, parentId) {
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'boundaries/' + boundaryid + '/', {
      method: 'DELETE',
      headers: {
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          if (parentId == 1) {
            dispatch(push('/'));
          } else {
            let parent = getState().boundaries.boundaryDetails[parentId];
            dispatch(push(parent.path));
          }
          dispatch(removeBoundary(boundaryid, parentId));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch(error => {
        console.log('request failed', error);
      });
  };
}

export function modifyBoundary(boundaryid, name) {
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'boundaries/' + boundaryid + '/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then(checkStatus)
      .then(response => {
        dispatch(responseReceivedFromServer({ results: [response] }));
        return response;
      })
      .catch(error => {
        console.log('request failed', error);
      });
  };
}

const newBoundaryFetch = options => {
  return fetch(serverApiBase + 'boundaries/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(options),
  }).catch(error => {
    console.log('request failed', error);
  });
};

export const saveNewDistrict = name => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 1 : 2;
  const options = {
    name,
    boundary_category: 9,
    boundary_type: boundaryType,
    parent: 1,
  };
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(openNode(response.id));
    dispatch(toggleModal('createDistrict'));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

export const saveNewBlock = options => (dispatch, getState) => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createBlock'));
    dispatch(openNode(response.id));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

export const saveNewCluster = options => (dispatch, getState) => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createCluster'));
    dispatch(openNode(response.id));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

export const saveNewProject = options => (dispatch, getState) => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createProject'));
    dispatch(openNode(response.id));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

export const saveNewCircle = options => (dispatch, getState) => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createCircle'));
    dispatch(openNode(response.id));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};
