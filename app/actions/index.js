import fetch from 'isomorphic-fetch';
import config from '../config.js';

const serverApiBase = config.PROD_SERVER_API_BASE;

export function showPrimarySchoolHierarchy() {
  return function(dispatch) {
    dispatch(selectPrimarySchool)
    return dispatch(fetchEntities(1, 1))
  }
}

function requestDataFromServer() {
  return {
    type: 'REQUEST_SENT',
    isFetching: true
  }
}

function responseReceivedFromServer(resp) {
  console.log("Received entities");
  return {
    type: 'RESPONSE_RECEIVED',
    isFetching: false,
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

function loginSuccess(authtoken) {
  //This belongs in the reducer?
  sessionStorage.setItem('token', authtoken);
  return {
    type: 'LOGIN_SUCCESS',
    authenticated: true,
    auth_token: authtoken
  }
}

function loginError() {
  return {
    type: 'LOGIN_FAILED',
    error: true,
    authenticated: false
  }
}

function requestLogout(username) {
  return {
    type: 'LOGOUT_REQUESTED',
    username
  }
}

export function logoutUser(username) {
  return function(dispatch, getState) {
    dispatch(requestLogout(username));
    sessionStorage.delete('token');
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
    if (getState().schoolSelection.primarySchool)
      boundaryType = 1
    else
      boundaryType = 2;
    requestBody = {
      parent: parentBoundaryId,
      boundary_type: boundaryType
    }
    //Send info about the whole request so we can track failure
    //dispatch(requestDataFromServer())
    return fetch(serverApiBase + 'boundaries/?parent=' + parentBoundaryId + '&boundary_type=' + boundaryType, {
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

function isInstitution(parentEntity) {
  if (parentEntity.institution_gender)
    return true
  return false
}

function isStudentGroup(parentEntity) {
}

function isBoundary(parentEntity) {
  if (parentEntity.boundary_category)
    return true
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
    var parentBoundaryCat = 10;
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

export function fetchUserData(token) {
  return function(dispatch) {
    return fetch('http://tadadev.klp.org.in/auth/me/', {
      method: "GET",
      headers: {
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
      },
    }).then(checkStatus(response))
      .then(data => {
        dispatch(userDataFetched(data))
          .catch(error => {
            dispatch(requestFailed(error));
            console.log('request failed', error)
          })
      })
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
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
        dispatch(loginError(error));
        throw error;
      }
    }).then(data => {
      dispatch(loginSuccess(data.auth_token))
    })
      .catch(error => {
        dispatch(loginError(error));
        console.log('request failed', error)
      })
  }
}

export function saveNewDistrict(name) {
  return function(dispatch, getState) {
    return fetch('http://tadadev.klp.org.in/api/v1/boundaries/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
      body: JSON.stringify({
        "name": name,
        "boundary_category": 9,
        "boundary_type": 1,
        "parent": 1
      })
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'TOGGLE_CREATE_DISTRICT_MODAL'
        })
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
