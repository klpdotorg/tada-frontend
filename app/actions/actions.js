import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {checkStatus, get} from './utils'

import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';
 import { urls as Urls } from '../constants';
 import _ from 'lodash'
 import store from '../store';
 import {boundaryType, genUrl} from './utils'

export const selectPrimaryTree = () => {
  return {
    type: 'PRIMARY_SELECTED'
  }
}

export const toggleNode = (id) => {
  return {
    type: 'TOGGLE_NODE',
    id
  }
}

export const selectPreschoolTree = () => {
  return {
    type: 'PRESCHOOL_SELECTED'
  }
}

function requestDataFromServer() {
  return {
    type: 'REQUEST_SENT'
  }
}

function responseReceivedFromServer(resp) {
  return {
    type: 'BOUNDARIES_FULFILLED',
    payload: resp
  }
}

function requestFailed(error) {
  console.log('error', error)
  return {
    type: 'REQUEST_FAILED',
    statusCode: error.response.status,
    statusText: error.response.statusText,
    error: error.response
  }
}

export function requestLogin(username) {
  return {
    type: 'LOGIN_REQUESTED',
    username
  }
}

export function loginSuccess(authtoken) {
  return {
    type: 'LOGIN_SUCCESS',
    authenticated: true,
    auth_token: authtoken
  }
}

export function removeBoundary(id, parentId) {
  return {
    type: 'REMOVE_BOUNDARY',
    id,
    parentId
  }
}

function loginError() {
  return {
    type: 'LOGIN_FAILED',
    error: true,
    authenticated: false
  }
}

export function userRegistrationSuccess(response) {
  return {
    type: 'USER_REGISTERED_SUCCESS',
    registered: true,
    error: false,
    username: response.username,
    email: response.email,
    id: response.id
  }
}

//Write user registration failure case

function requestLogout() {
  return {
    type: 'LOGOUT'
  }
}

export function logoutUser() {
  return function(dispatch, getState) {
    return fetch(Urls.LOGOUT, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
    }).then(response => {
      if(response.status > 200 && response.status < 300)
      {
        sessionStorage.removeItem('token');
        store.dispatch(push('/logout'));
      }
    }).catch(error => {
      console.log(error);
    });


  }
}

function userDataFetched(data) {
  return {
    type: 'USER_DATA_FETCHED',
    username: data.username,
    email: data.email,
    groups: data.groups,
    id: data.id
  }
}

function studentsFetched(data, groupId) {
  return {
    type: 'STUDENTS_FETCHED',
    data,
    groupId
  }
}

export const getBoundaries = (parentId) => {
  return get(`${serverApiBase}boundaries/?parent=${parentId}&limit=500`)
}


export function fetchBoundaryDetails(parentBoundaryId = 1) {
  return function(dispatch, getState) {

    var requestBody = {}
    var boundaryType = -1;
    if (getState().schoolSelection.primarySchool) {
      boundaryType = 1
    } else {
      boundaryType = 2;
    }
    requestBody = {
      parent: parentBoundaryId,
      boundary_type: boundaryType
    }
    //Send info about the whole request so we can track failure
    dispatch(requestDataFromServer())
    return fetch(serverApiBase + 'boundaries/?parent=' + parentBoundaryId + '&limit=500', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(responseReceivedFromServer(data))
    }).catch(error => {
      console.log(error)
      dispatch(requestFailed(error))
    })
  }
}


export const getInstitutions = (parentId) => {
  return get(`${serverApiBase}institutions/?boundary=${parentId}`)
}

//Method fetches institutions belonging to a particular Id from the institutions endpoint
export function fetchInstitutionDetails(parentBoundaryId) {
  return function(dispatch, getState) {
    var institutionsUrl = serverApiBase + "institutions/?";
    return fetch(institutionsUrl + 'boundary=' + parentBoundaryId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(responseReceivedFromServer(data))
    }).catch(error => {
      dispatch(requestFailed(error))
    })
  }
}

export const getStudentGroups = (institutionId) => {
  return get(`${serverApiBase}institutions/${institutionId}/studentgroups/`)
}

export function fetchStudentGroups(institutionId) {
  return function(dispatch, getState) {
    var url = serverApiBase + "institutions/" + institutionId + "/studentgroups/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
        dispatch(responseReceivedFromServer(data))
    }).catch(error => {
        dispatch(requestFailed(error))
    })
  }
}

export const getStudents = (institutionId, classId) => {
  return get(`${serverApiBase}institutions/${institutionId}/studentgroups/${classId}/students/`)
}

export function fetchStudents(groupId) {
  return function(dispatch, getState) {

    const state = getState()
    const institutionId = state.boundaries.boundaryDetails[groupId].institution
    var url = serverApiBase + `institutions/${institutionId}/studentgroups/${groupId}/students/`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(studentsFetched(data.results, groupId))
    }).catch(error => {
      console.log(error)
      dispatch(requestFailed(error))
    })
  }
}

/*
This function decides whether we need to go to the boundaries endpoint or the institutions endpoint or studentgroup/students endpoint for data.
Everything is just one big nav tree in the UI.
*/
export function fetchEntitiesFromServer(parentBoundaryId) {
  return function(dispatch, getState) {
   const state = getState();
   return dispatch(boundaryType(parentBoundaryId, state.boundaries.boundaryDetails)(parentBoundaryId));
 }
}

export function fetchUserData() {
  const token = sessionStorage.getItem('token')
  return function(dispatch) {
    return fetch(Urls.USER_PROFILE, {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
      },
    }).then(response => (checkStatus(response)))
    .then(data => {
      /* HACK: Remove this if permissions are implemented */
      if (data.email == "tadaadmin@klp.org.in" || 'aksanoble@gmail.com') {
        sessionStorage.setItem('isAdmin', true);
      }
      dispatch(loginSuccess(token))
      dispatch(userDataFetched(data))
    })
    .catch(error => {
      console.log(error.response);
      dispatch(requestFailed(error));
    })
  }
}

export function sendRegisterUser(email, password, username) {
  return function(dispatch, getState) {

    return fetch(Urls.REGISTER, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then(data => {

      dispatch(userRegistrationSuccess(data))
      //dispatch(fetchUserData(sessionStorage.token))
      //dispatch(push('/'))
    }).catch(error => {
      //dispatch(loginError(error));
      console.error('request failed', error)
    })
  }
}

export function sendLoginToServer(email, pass) {
  return function(dispatch, getState) {

    return fetch(Urls.LOGIN, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: pass
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then(data => {
      sessionStorage.setItem('token', data.auth_token);

      dispatch(loginSuccess(data.auth_token))
      dispatch(fetchUserData(sessionStorage.token))
      dispatch(push('/'))
    }).catch(error => {
      dispatch(loginError(error));
      console.error('request failed', error)
    })
  }
}

export function deleteBoundary(boundaryid, parentId){
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'boundaries/'+boundaryid+'/', {
      method: 'DELETE',
      headers: {
        'Authorization' : 'Token ' + sessionStorage.token
      }
    }).then(response =>{
     if (response.status >= 200 && response.status < 300) {
      dispatch(removeBoundary(boundaryid, parentId));
      //dispatch(fetchEntitiesFromServer(1))
        //Route the user to the home dashboard page since the page they were on will be deleted
        dispatch(push('/'));
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).catch(error => {
      console.log('request failed', error)
    })
  }
}

// export function modifyBoundary(boundaryid, name){
//   return function(dispatch, getState) {
//     return fetch(serverApiBase + 'boundaries/' + boundaryid +'/', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization' : 'Token ' + sessionStorage.token
//       },
//       body: JSON.stringify({
//         "name": name
//       })
//     }).then(response => {
//      if (response.status >= 200 && response.status < 300) {
//         var json = response.json();
//         dispatchBoundaryModified(json);
//         return json;
//     } else {
//       const error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     }
//   }).catch(error => {
//     console.log('request failed', error)
//   })
// }
// }

export function modifyBoundary(boundaryid, name){
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'boundaries/' + boundaryid +'/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Token ' + sessionStorage.token
      },
      body: JSON.stringify({
        "name": name
      })
    }).then(checkStatus).then(response => {

        dispatchBoundaryModified(response);
        return response;
    }).catch(error => {
    console.log('request failed', error)
  })
}
}

const request = (method, options, url) => {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options)
  }).catch(error => {
    console.log('request failed', error)
  })
}

const newBoundaryFetch = (options) => {
  return fetch(serverApiBase + 'boundaries/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options)
  }).catch(error => {
    console.log('request failed', error)
  })
}

function dispatchToggleModal(modalType)
{
  store.dispatch({
    type: 'TOGGLE_MODAL',
    modal: `${modalType}`
  });
}

function dispatchBoundaryModified(data)
{
  store.dispatch({
    type: 'BOUNDARY_MODIFIED',
    boundary: data
  });
}

function dispatchBoundaryCreated(dispatch,data)
{
  store.dispatch({
    type: 'BOUNDARY_CREATED',
    boundary: data
  });
}

export const saveNewDistrict = name => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 1: 2
  const options = {
    name,
    boundary_category: 9,
    boundary_type: boundaryType,
    parent: 1
  }
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(dispatch, response);
    dispatchToggleModal('createDistrict');
  })
}

export const saveNewBlock = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(dispatch, response);
    dispatchToggleModal('createBlock');
  })
}

export const saveNewCluster = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(dispatch, response);
    dispatchToggleModal('createCluster');
  })
}

export const saveNewProject = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    // dispatch(fetchEntitiesFromServer(1))
    // dispatch(push('/'));
     dispatch({
      type: 'BOUNDARY_CREATED',
      boundary: response
    });
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createProject'
    })
  })
}

export const saveNewCircle = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    // dispatch(fetchEntitiesFromServer(1))
    // dispatch(push('/'));
     dispatch({
      type: 'BOUNDARY_CREATED',
      boundary: response
    });
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCircle'
    })
  })
}
