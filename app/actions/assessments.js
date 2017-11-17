import { SERVER_API_BASE as serverApiBase } from 'config';

import { get, post, patch } from './requests';

import {
  TOGGLE_MODAL,
  SET_ASSESSMENTS,
  SHOW_ASSESSMENT_LOADING,
  CLOSE_ASSESSMENT_LOADING,
  SET_ASSESSMENT,
  SET_EDIT_ASSESSMENT_ID,
} from './types';

export const showAssessmentLoading = () => {
  return {
    type: SHOW_ASSESSMENT_LOADING,
  };
};

export const closeAssessmentLoading = () => {
  return {
    type: CLOSE_ASSESSMENT_LOADING,
  };
};

export const assessmentCreated = (value, programId) => {
  return {
    type: SET_ASSESSMENT,
    value,
    programId,
  };
};

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
      modal: 'createAssessment',
    });
  };
};

export const openEditAssessmentModal = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_EDIT_ASSESSMENT_ID,
      value,
    });

    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editAssessment',
    });
  };
};

export const saveNewAssessment = (options) => {
  return (dispatch, getState) => {
    dispatch(showAssessmentLoading());

    const state = getState();
    const programId = state.programs.selectedProgram;
    const createAssessmentURL = `${serverApiBase}surveys/${programId}/questiongroup/`;

    post(createAssessmentURL, options).then((response) => {
      dispatch(assessmentCreated([response], programId));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createAssessment',
      });
      dispatch(closeAssessmentLoading());
    });
  };
};

export const saveAssessment = (options) => {
  return (dispatch, getState) => {
    dispatch(showAssessmentLoading());

    const state = getState();
    const { selectedProgram } = state.programs;
    const { editAssessmentId } = state.assessments;
    const editAssessmentURL = `${serverApiBase}surveys/${selectedProgram}/questiongroup/${editAssessmentId}/`;

    patch(editAssessmentURL, options).then((response) => {
      dispatch(assessmentCreated([response], selectedProgram));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editAssessment',
      });
      dispatch(closeAssessmentLoading());
    });
  };
};
