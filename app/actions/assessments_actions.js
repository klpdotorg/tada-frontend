import { checkStatus as checkRespStatus } from './actions';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {SERVER_API_BASE as serverApiBase,
 SERVER_AUTH_BASE as authApiBase} from 'config';

export function fetchAssessmentsForProgram(programId)
{
  return function(dispatch, getState) {
    var url =  serverApiBase + "programmes/" + programId + "/assessments/";
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then(data => {
      dispatch(handleAssessmentsResponse(data));
    }).catch(error => {
      console.log(error);
      //dispatch(requestFailed(error));
    });
  }
}

function handleAssessmentsResponse(resp) {
  return {
    type: 'ASSESSMENTS_RESPONSE_RECEIVED',
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
  error.response = response;
  throw error;
}