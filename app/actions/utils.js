import {fetchBoundaryDetails, fetchInstitutionDetails, fetchStudentGroupsForInstitution} from './index'

export const boundaryType = (id = 1, details) => {  
  let boundaryCategory, institution;
  if (details[id]) {
   boundaryCategory = details[id].boundary_category
   institution = !! details[id].institution_gender
  }  
  return boundaryCategory == 11 || boundaryCategory == 15 ? fetchInstitutionDetails : 
  institution ? fetchStudentGroupsForInstitution : fetchBoundaryDetails
} 