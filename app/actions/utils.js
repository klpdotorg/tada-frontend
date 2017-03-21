import {fetchBoundaryDetails, fetchInstitutionDetails, fetchStudentGroups, fetchStudents} from './index'
import { SERVER_API_BASE} from 'config';
import Notifications from 'react-notification-system-redux';
import {syncError} from './notifications'

export const get = (url) => {
  return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus)
}

export const deleteRequest = (url) => {
  return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatusNoJSON)
}


export const post = (url, body) => {
  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      },
      body: JSON.stringify(body)
    }).then(checkStatus).catch(e => {
      Notifications.error(syncError(e))
    })
}

export const mapStudentsAPI = (body) => {
  return post(`${SERVER_API_BASE}studentgroups/${body.student_group}/students/${body.student}/enrollment/`, body)
}

export const deleteStudentAPI = (id) => {
  return deleteRequest(`${SERVER_API_BASE}students/${id}/`)
}

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    store.dispatch(logoutUser());
    store.dispatch(push('/login'));
    return;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export const checkStatusNoJSON = (response) => {
  if(response.status >=200 && response.status <300){
    return response;
  } else if(response.status === 401) {
     store.dispatch(logoutUser());
     store.dispatch(push('/login'));
     return;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export const boundaryType = (id = 1, details) => {
  let boundaryCategory, institution;
  switch (details[id].depth) {
    case 2:
      return fetchInstitutionDetails
    case 3:
      return fetchStudentGroups
    case 4:
      return fetchStudents
    default:
      return fetchBoundaryDetails
  }
}

export const genUrl = (url, base) => {
  return base + url
}
