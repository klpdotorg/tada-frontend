import { SERVER_API_BASE as serverApiBase } from 'config';

import { get } from './requests';

import { TOGGLE_MODAL, SET_ASSESSMENTS } from './types';

export const setAssessments = (value, programId) => {
  return {
    type: SET_ASSESSMENTS,
    value,
    programId,
  };
};

export const getAssessments = (programId) => {
  return (dispatch) => {
    const fetchAssessmentsURL = `${serverApiBase}surveys/${programId}/questiongroup/`;
    get(fetchAssessmentsURL).then((response) => {
      dispatch(setAssessments(response.results, programId));
    });
  };
};

export const openAddAssessmentModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'addAssessment',
    });
  };
};
