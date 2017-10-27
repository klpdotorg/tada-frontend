import {
  fetchBoundaryDetails,
  fetchInstitutionDetails,
  fetchStudentGroups,
  fetchStudents,
} from './index';
import { post, patch, deleteRequest } from './requests';
import { SERVER_API_BASE } from 'config';

export const patchStudentAPI = (body, groupId) => {
  return patch(`${SERVER_API_BASE}students/${body.id}/`, body).then(data => {
    return new Promise((resolve, reject) => {
      resolve({
        students: {
          results: [data],
        },
        groupId,
      });
    });
  });
};

export const mapStudentsAPI = body => {
  return post(
    `${SERVER_API_BASE}studentgroups/${body.student_group}/students/${body.student}/enrollment/`,
    body,
  );
};

export const deleteStudentAPI = id => {
  return deleteRequest(`${SERVER_API_BASE}students/${id}/`);
};

export const boundaryType = (id = 2, details) => {
  let boundaryCategory, institution;
  // console.log(id)
  // console.log(details[id])
  switch (details[id].depth) {
    case 2:
      return fetchInstitutionDetails;
    case 3:
      return fetchStudentGroups;
    case 4:
      return fetchStudents.bind(null, details[id].institution);
    default:
      return fetchBoundaryDetails;
  }
};

export const genUrl = (url, base) => {
  return base + url;
};
