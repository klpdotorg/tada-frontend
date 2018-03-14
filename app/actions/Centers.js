import { SERVER_API_BASE } from 'config';
import _ from 'lodash';

import { get, post } from './requests';
import { SET_CENTERS, SELECT_CENTER } from './types';

export const selectCenter = (Id) => {
  return {
    type: SELECT_CENTER,
    value: Id,
  };
};

export const fetchCenters = (institutionId) => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}institutions/${institutionId}/studentgroups/?group_type=center`;
    get(url).then((response) => {
      dispatch({
        type: SET_CENTERS,
        value: response.results,
      });
      if (response.results.length) {
        dispatch(selectCenter(_.get(response.results, '0.id', '')));
      }
    });
  };
};

export const mapStudentsWithCenter = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { boundaryDetails } = state.boundaries;
    const { selectedStudents } = state.students;
    const { selectedCenter } = state.centers;

    const values = selectedStudents.map((Id) => {
      return { ...boundaryDetails[Id], academic_year: '0607' };
    });

    post(`${SERVER_API_BASE}studentgroups/${selectedCenter}/students/`, values).then((res) => {
      console.log(res);
    });
  };
};
