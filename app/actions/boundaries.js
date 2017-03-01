import {SERVER_API_BASE as serverApiBase} from 'config';
import {checkStatus, get} from './utils';
import {push} from 'react-router-redux';
import {boundaryType, genUrl} from './utils';
import store from '../store'



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

function dispatchBoundaryCreated(data)
{
  store.dispatch({
    type: 'BOUNDARY_CREATED',
    boundary: data
  });
}

function dispatchInstitutionCreated(data)
{
  store.dispatch({
    type: 'INSTITUTION_CREATED',
    entity: data
  });
}

export function removeBoundary(id, parentId) {
  return {
    type: 'REMOVE_BOUNDARY',
    id,
    parentId
  }
}

export function deleteInstitution(parentId, instiId){
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'institutions/'+ instiId +'/',{
      method: 'DELETE',
      headers: {
        'Authorization' : 'Token ' + sessionStorage.token
      }
    }).then(response => {
     if (response.status >= 200 && response.status < 300) {
       dispatch(removeBoundary(instiId, parentId))
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

const newInstitutionFetch = (options) => {
  return fetch(serverApiBase + 'institutions/', {
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

export const saveNewInstitution = options => dispatch => {
  return newInstitutionFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(response);
    dispatchToggleModal('createInstitution');
  })
}

const institutionFetch = (options) => {
  return fetch(serverApiBase + 'institutions/' + options.id + '/', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options)
  }).catch(error => {
    console.log('request failed', error)
  })
}

export const saveInstitution = options => dispatch => {
  return institutionFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryModified(response);
  })
}

const classNewFetch = (options) => {
  return fetch(serverApiBase + 'studentgroups/', {
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

const classFetch = (options) => {
  return fetch(serverApiBase + 'studentgroups/' + options.id + '/', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options)
  }).catch(error => {
    console.log('request failed', error)
  })
}

export const saveNewClass = options => dispatch => {
  return classNewFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(response);
    //dispatch(push('/'));
  })
}

export const saveClass = options => dispatch => {
  return classFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryModified(response);
    //dispatch(push('/'));
  })
}

export const deleteStudentGroup = options => {
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'studentgroups/' + options.id + '/',{
      method: 'DELETE',
      headers: {
        'Authorization' : 'Token ' + sessionStorage.token
      }
    }).then(response => {
     if (response.status >= 200 && response.status < 300) {
      dispatch(removeBoundary(options.id, options.institution))
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

const addStudentsFetch = (options) => {
  return fetch(serverApiBase + 'institutions/' + options.institution + '/studentgroups/' + options.class + '/students/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options.students)
  }).catch(error => {
    console.log('request failed', error)
  })
}

export const saveNewStudents = options => dispatch => {
  return addStudentsFetch(options).then(checkStatus).then(response => {
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
    // dispatch({
    //   type: 'TOGGLE_MODAL',
    //   modal: 'createInstitution'
    // })
  })
}

const studentFetch = (options) => {
  return fetch(serverApiBase + 'students/' + options.id + '/', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + sessionStorage.token
    },
    body: JSON.stringify(options)
  }).catch(error => {
    console.log('request failed', error)
  })
}

export const saveStudent = options => dispatch => {
  return studentFetch(options).then(checkStatus).then(response => {
    dispatch(fetchEntitiesFromServer(1))
    dispatch(push('/'));
  })
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


export const saveNewDistrict = name => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 1: 2
  const options = {
    name,
    boundary_category: 9,
    boundary_type: boundaryType,
    parent: 1
  }
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(response);
    dispatchToggleModal('createDistrict');
  })
}

export const saveNewBlock = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(response);
    dispatchToggleModal('createBlock');
  })
}

export const saveNewCluster = options => dispatch => {
  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatchBoundaryCreated(response);
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




function responseReceivedFromServer(resp) {
  return {
    type: 'RESPONSE_RECEIVED',
    data: resp.results
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

export const selectPrimaryTree = () => {
  return {
    type: 'PRIMARY_SELECTED'
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
export function fetchStudents(groupId) {
  return function(dispatch, getState) {

    const state = getState()
    const institutionId = state.entities.boundaryDetails[groupId].institution
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
   return dispatch(boundaryType(parentBoundaryId, state.entities.boundaryDetails)(parentBoundaryId));
 }
}


