import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';

export function fetchAllPrograms()
{
  return function(dispatch, getState) 
  {
    var url = serverApiBase + "programmes/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
    }).then(checkStatus).then(data => {

      dispatch(handleProgramsResponse(data));
    }).catch(error => {
        throw error;//Let the higher level layers handle this.
    });
  }
}


/* This method handles the responses received from the programs endpoint
*/
function handleProgramsResponse(resp) {
  return {
    type: 'PROGRAMS_RESPONSE_RECEIVED',
    data: resp.results
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    dispatch(push('/login'));
    return;
  }
  const error = new Error(response.statusText);
  error.response = response.json();
  throw error;
}

export function createNewProgram(name, description, startDate, endDate, isActive) {
  return function(dispatch, getState){
    var url = serverApiBase + "programmes/";
    var programInstCat = JSON.stringify({
      "id":1,
      "boundary_type":"Primary School"
    });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
      body: JSON.stringify({
        name: name,
        description: description,
        start_date: startDate,
        end_date: endDate,
        active: 1,
        programme_institution_category: 1
      })
    }).then(checkStatus).then(response => {
      dispatch(createProgramSuccessful(response));
      return response;
    });
  }
}

function createProgramSuccessful(newProgram)
{
  return{
    type: 'PROGRAM_CREATED',
    program: newProgram
  }
}

function deleteProgramSuccessful(id)
{
  return {
    type: 'PROGRAM_DELETED',
    programId: id
  }
}

function editProgramSuccessful(edited)
{
  return {
    type: 'PROGRAM_EDITED',
    program: edited
  }
}



export function editProgram(id, name, description, startDate, endDate, isActive)
{
   return function(dispatch, getState){
    var url = serverApiBase + "programmes/" + id + "/";  
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
      body: JSON.stringify({
        name: name,
        description: description,
        start_date: startDate,
        end_date: endDate,
        active: 1,
        programme_institution_category: 1
      })
    }).then(checkStatus).then(response => {
        dispatch(editProgramSuccessful(response));
        return response;
    });
  }
}

export function deleteProgram(id)
{
  return function(dispatch, getState){
    var url = serverApiBase + "programmes/" + id +"/";
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(response => {
       if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status === 401) {
          dispatch(push('/login'));
          return;
        }
        const error = new Error(response.statusText);
        error.response = response.json();
        throw error;
    }).then(response => {
        dispatch(deleteProgramSuccessful(id));
        return response;
    });
  }
}

