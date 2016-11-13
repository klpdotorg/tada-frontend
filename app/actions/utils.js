import {fetchBoundaryDetails, fetchInstitutionDetails, fetchStudentGroups, fetchStudents} from './index'

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