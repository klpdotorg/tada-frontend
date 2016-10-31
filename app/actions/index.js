import fetch from 'isomorphic-fetch';
import config from '../config.js';
import { push } from 'react-router-redux';
const serverApiBase = config.PROD_SERVER_API_BASE;
import store from '../store'

export function showPrimarySchoolHierarchy() {
  return function(dispatch) {
    dispatch(selectPrimarySchool)
    return dispatch(fetchEntities(1, 1))
  }
}

function requestDataFromServer() {
  return {
    type: 'REQUEST_SENT'
  }
}

function responseReceivedFromServer(resp) {
  return {
    type: 'RESPONSE_RECEIVED',    
    data: resp.results
  }
}

/* This method handles the responses received from the programs endpoint
*/
function handleProgramsInstitutionResponse(resp) {
  return {
    type: 'PROGRAMS_INSTITUTION_RESPONSE_RECEIVED',
    data: resp.results
  }
}

/* This method handles the responses received from the programs endpoint
*/
function handleProgramsStudentResponse(resp) {
  return {
    type: 'PROGRAMS_STUDENT_RESPONSE_RECEIVED',
    data: resp.results
  }
}

function handleAssessmentsInstitutionResponse(resp) {
  return {
    type: 'ASSESSMENTS_INSTITUTION_RESPONSE_RECEIVED',
    data: resp.results
  }
}

function handleStudentAssessmentsResponse(resp) {
  return {
    type: 'ASSESSMENTS_STUDENT_RESPONSE_RECEIVED',
    data: resp.results
  }
}

function requestFailed(error) {
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

export function removeBoundary(id) {
  return {
    type: 'REMOVE_BOUNDARY',
    id: id
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
    sessionStorage.removeItem('token');
    dispatch(requestLogout());
  }
}

function userDataFetched(data) {
  return {
    type: 'USER_DATA_FETCHED',
    username: data.username
  }
}

export function fetchBoundaryDetails(parentBoundaryId) {
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
    return fetch(serverApiBase + 'boundaries/?parent=' + parentBoundaryId + '&boundary_type=' + boundaryType + '&limit=500', {
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

//Method fetches institutions belonging to a particular Id from the institutions endpoint
function fetchInstitutionDetails(parentBoundaryId) {
  return function(dispatch, getState) {
    var institutionsUrl = "http://tadadev.klp.org.in/api/v1/institutions/?";
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

export function fetchProgramsInstitution()
{
  return function(dispatch, getState) {
    var url = "http://tadadev.klp.org.in/api/v1/programmes-institution/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
          dispatch(handleProgramsInstitutionResponse(data));
        }).catch(error => {
      dispatch(requestFailed(error));
    });
}
}

export function fetchProgramsStudent()
{
  return function(dispatch, getState) {
    var url = "http://tadadev.klp.org.in/api/v1/programmes-student/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(handleProgramsStudentResponse(data));
    }).catch(error => {
      dispatch(requestFailed(error));
    });
}
}

export function fetchAssessmentsForInstitutionPrograms(programId)
{
  return function(dispatch, getState) {
    var url = "http://tadadev.klp.org.in/api/v1/programmes-institution/" + programId + "/assessments-institution/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(handleAssessmentsInstitutionResponse(data));
    }).catch(error => {
      dispatch(requestFailed(error));
    });
}
}

export function fetchAssessmentsForStudentPrograms(programId)
{
  return function(dispatch, getState) {
    var url = "http://tadadev.klp.org.in/api/v1/programmes-student/" + programId + "/assessments-student/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(handleStudentAssessmentsResponse(data));
    }).catch(error => {
      dispatch(requestFailed(error));
    });
}
}

function isInstitution(parentEntity) {
  if (parentEntity.institution_gender)
    return true
  return false
}

function isStudentGroup(parentEntity) {
}

function isBoundary(parentEntity) {
  if (parentEntity.boundary_category) {
    return true
  }
  return false
}

function fetchStudentGroupsForInstitution(institutionId) {
  return function(dispatch, getState) {
    var url = "http://tadadev.klp.org.in/api/v1/institutions/" + institutionId + "/studentgroups/";
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
/*
This function decides whether we need to go to the boundaries endpoint or the institutions endpoint or studentgroup/students endpoint for data.
Everything is just one big nav tree in the UI.
*/
export function fetchEntitiesFromServer(parentBoundaryId) {
  return function(dispatch, getState) {
    const state = getState()
    var parentId = -1;
    //Set it to 1 if there's no parent passed in.
    if (!parentBoundaryId) {
      parentId = 1;
    } else {
      parentId = parentBoundaryId;
    }
    //Initialize to the primary's district category (10)
    var parentBoundaryCat = 9;
    if (!state.schoolSelection.primarySchool)
      parentBoundaryCat = 13;
    //If we have boundary details already and this is not the root district, then we retrieve the parent boundary category
    // from the boundary itself. We need to identify whether this is an institution or a boundary and call the appropriate endpoint
    if (!jQuery.isEmptyObject(state.entities.boundaryDetails) && parentId != 1) {
      //If the parent is a boundary, then figure out whether to branch off to the institutions endpoint or boundaries
      if (isBoundary(state.entities.boundaryDetails[parentId])) {
        parentBoundaryCat = state.entities.boundaryDetails[parentId].boundary_category;
        //If boundary category is a circle (preschool, 15) or a cluster (primary, 11), then fetch from the institutions endpoint
        if (parentBoundaryCat == 11 || parentBoundaryCat == 15) {
          dispatch(fetchInstitutionDetails(parentId));
        } else {
          dispatch(fetchBoundaryDetails(parentId));
        }
      }
      //If the parent is an Institution, go to studentgroups endpoint to fetch student groups data
      else if (isInstitution(state.entities.boundaryDetails[parentId])) {
        dispatch(fetchStudentGroupsForInstitution(parentId))
      }
      //Fetch students data because this is the only other option
      else {

      }
    } else {
      dispatch(fetchBoundaryDetails(parentId));
    }
  }
}

export function fetchUserData() {
  const token = sessionStorage.getItem('token')
  return function(dispatch) {
    return fetch('http://tadadev.klp.org.in/auth/me/', {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
      },
    }).then(response => (checkStatus(response)))
    .then(data => {
      /* HACK: Remove this if permissions are implemented */
      if (data.email == "tadaadmin@klp.org.in") {
        sessionStorage.setItem('isAdmin', true);
      }
      dispatch(loginSuccess(token))
      dispatch(userDataFetched(data))
    })
    .catch(error => {
      dispatch(requestFailed(error));
      console.log(error.response);
    })
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    store.dispatch(logoutUser());
    store.dispatch(push('/login'));
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function sendRegisterUser(email, password, username) {
  return function(dispatch, getState) {

    return fetch('http://tadadev.klp.org.in/auth/register/', {
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

    return fetch('http://tadadev.klp.org.in/auth/login/', {
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

export function deleteBoundary(boundaryid){
  return function(dispatch, getState) {
    return fetch('http://tadadev.klp.org.in/api/v1/boundaries/'+boundaryid+'/', {
      method: 'DELETE',
      headers: {
        'Authorization' : 'Token ' + sessionStorage.token
      }
    }).then(response =>{
     if (response.status >= 200 && response.status < 300) {
      dispatch(removeBoundary(boundaryid))
      dispatch(fetchEntitiesFromServer(1))
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

export function modifyBoundary(boundaryid, name){
  return function(dispatch, getState) {
    return fetch('http://tadadev.klp.org.in/api/v1/boundaries/' + boundaryid +'/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Token ' + sessionStorage.token
      },
      body: JSON.stringify({
        "name": name
      })
    }).then(response => {
     if (response.status >= 200 && response.status < 300) {
      dispatch(fetchEntitiesFromServer(1))
      dispatch(push('/'));  
      return response.json();
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

const newBoundaryFetch = (options) => {
  return fetch('http://tadadev.klp.org.in/api/v1/boundaries/', {
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

export const saveNewDistrict = name => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySelected ? 1: 2
  const options = {
    name,
    boundary_category: 9,
    boundary_type: boundaryType,
    parent: 1
  }
  return newBoundaryFetch(options).then(checkStatus).then(response => {    
    dispatch(fetchEntitiesFromServer(1))
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createDistrict'
    })   
  })
}

export const saveNewBlock = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {    
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createBlock'
    })
  })
}

export const saveNewCluster = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {    
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCluster'
    })   
  })
}

export const saveNewProject = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {    
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createProject'
    })   
  })
}

export const saveNewCircle = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {    
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCircle'
    })   
  })
}