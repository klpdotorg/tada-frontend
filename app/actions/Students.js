import { SERVER_API_BASE } from 'config';
import { get } from './requests';
import { SELECT_STUDENT_IN_VIEW_STUDENTS } from './types';
import {
  responseReceivedFromServer,
  getEntities,
  closeBoundaryLoading,
  requestFailed,
} from './index';

export const selectStudent = value => ({
  type: SELECT_STUDENT_IN_VIEW_STUDENTS,
  value,
});

export const fetchStudents = (parentBoundaryId, moreIds) => (dispatch) => {
  const getStudentURL = `${SERVER_API_BASE}studentgroups/${parentBoundaryId}/students/`;
  return get(getStudentURL)
    .then((data) => {
      dispatch(responseReceivedFromServer(data));
      if (moreIds && moreIds.length) {
        dispatch(getEntities(moreIds));
      } else {
        dispatch(closeBoundaryLoading());
      }
    })
    .catch((error) => {
      dispatch(requestFailed(error));
    });
};
