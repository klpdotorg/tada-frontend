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
  error.response = response;
  throw error;
}

