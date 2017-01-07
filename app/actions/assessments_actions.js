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

export function createAssessment(programId, assessmentName, startDate,endDate, 
  isActive, doubleEntry)
{
    return function(dispatch, getState){
      var url= serverApiBase + "programmes/" + programId + "/assessments/";
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + sessionStorage.token
        },
        body: JSON.stringify({
        programme: programId,
        name: assessmentName,
        start_date: startDate,
        end_date: endDate,
        active: isActive,
        double_entry: doubleEntry
      })
      }).then(checkStatus).then(data => {
        dispatch(createAssessmentSuccessful(data));
      });
    }
}

export function editAssessment(programId, assessmentId, assessmentName, startDate, endDate, isActive, doubleEntry)
{
return function(dispatch, getState){
      var url= serverApiBase + "programmes/" + programId + "/assessments/" + assessmentId +"/";
      return fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + sessionStorage.token
        },
        body: JSON.stringify({      
        name: assessmentName,
        start_date: startDate,
        end_date: endDate,
        active: isActive,
        double_entry: doubleEntry
      })
      }).then(checkStatus).then(data => {
        dispatch(editAssessmentSuccessful(data));
      });
    }

}

export function deleteAssessment(parent_programmeid, assessmentId)
{
return function(dispatch, getState){
    var url = serverApiBase + "programmes/" + parent_programmeid +"/assessments/" + assessmentId +"/";
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
        dispatch(deleteAssessmentSuccessful(assessmentId));
        return response;
    });
  }
}

function handleAssessmentsResponse(resp) {
  return {
    type: 'ASSESSMENTS_RESPONSE_RECEIVED',
    data: resp.results
  }
}

function createAssessmentSuccessful(item) {
  return {
    type: 'ASSESSMENT_CREATED',
    assessment: item
  }
}

function deleteAssessmentSuccessful(id)
{
  return {
    type: 'ASSESSMENT_DELETED',
    id: id
  }
}

function editAssessmentSuccessful(data)
{
  return{
    type: 'ASSESSMENT_EDITED',
    assessment: data
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