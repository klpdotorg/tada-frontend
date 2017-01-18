import {fetchBoundaryDetails, fetchInstitutionDetails, fetchStudentGroups, fetchStudents} from './index'

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