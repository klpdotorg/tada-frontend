import { SERVER_API_BASE } from 'config';
import { get } from './requests';
import {
  setBoundaries,
  getEntities,
  closeBoundaryLoading,
  requestFailed,
} from './index';

export const fetchStudentGroup = (parentBoundaryId, moreIds) => (
  (dispatch) => {
    const studentgroupUrl = `${SERVER_API_BASE}institutions/${parentBoundaryId}/studentgroups/`;
    return get(studentgroupUrl)
    .then(data => {
      dispatch(setBoundaries(data));
      if (moreIds && moreIds.length) {
        dispatch(getEntities(moreIds));
      } else {
        dispatch(closeBoundaryLoading());
      }
    })
    .catch(error => {
      dispatch(requestFailed(error));
    });
  }
);
