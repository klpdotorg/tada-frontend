import { SERVER_API_BASE as serverApiBase } from 'config';

import { get, post, patch, deleteRequest } from './requests';

import {
  TOGGLE_MODAL,
  SET_ASSESSMENTS,
  SHOW_ASSESSMENT_LOADING,
  CLOSE_ASSESSMENT_LOADING,
  SET_ASSESSMENT,
  SET_EDIT_ASSESSMENT_ID,
  SELECT_ASSESSMENT,
  CREATE_ASSESSMENT_ERROR,
  SET_RESPONDENT_TYPES,
} from './types';
import { closeConfirmModal } from './index';

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

export const selectAssessment = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedAssessments } = state.assessments;
    const exist = selectedAssessments.includes(id);

    if (exist) {
      dispatch({
        type: SELECT_ASSESSMENT,
        value: selectedAssessments.filter((ass) => {
          return ass !== id;
        }),
      });
    } else {
      dispatch({
        type: SELECT_ASSESSMENT,
        value: [...selectedAssessments, id],
      });
    }
  };
};

export const assessmentCreated = (value) => {
  return {
    type: SET_ASSESSMENT,
    value,
  };
};

export const setAssessments = (value) => {
  return {
    type: SET_ASSESSMENTS,
    value,
  };
};

export const getAssessments = (programId) => {
  return (dispatch) => {
    dispatch(showAssessmentLoading());
    const fetchAssessmentsURL = `${serverApiBase}surveys/${programId}/questiongroup/`;
    get(fetchAssessmentsURL).then(({ data }) => {
      dispatch(setAssessments(data.results));
      dispatch(closeAssessmentLoading());
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
    // dispatch(showAssessmentLoading());

    const state = getState();
    const programId = state.programs.selectedProgram;
    const createAssessmentURL = `${serverApiBase}surveys/${programId}/questiongroup/`;
    post(createAssessmentURL, options).then((response) => {
      if (response.status === 201) {
        dispatch(assessmentCreated(response.data));
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'createAssessment',
        });
        dispatch({
          type: CREATE_ASSESSMENT_ERROR,
          value: {},
        });
      } else {
        dispatch({
          type: CREATE_ASSESSMENT_ERROR,
          value: response.data,
        });
      }
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

    patch(editAssessmentURL, options).then(({ data }) => {
      dispatch(assessmentCreated(data));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editAssessment',
      });
      dispatch(closeAssessmentLoading());
    });
  };
};

export const deactivateAssessments = () => {
  return (dispatch, getState) => {
    dispatch(showAssessmentLoading());
    dispatch(closeConfirmModal());

    const state = getState();
    const { selectedProgram } = state.programs;
    const { selectedAssessments } = state.assessments;
    const promises = selectedAssessments.map((id) => {
      const url = `${serverApiBase}surveys/${selectedProgram}/questiongroup/${id}/`;
      return patch(url, {
        status: 'IA',
      });
    });

    Promise.all(promises).then(() => {
      dispatch({
        type: SELECT_ASSESSMENT,
        value: [],
      });
      dispatch(getAssessments(selectedProgram));
    });
  };
};

export const deleteAssessments = () => {
  return (dispatch, getState) => {
    dispatch(showAssessmentLoading());
    dispatch(closeConfirmModal());

    const state = getState();
    const { selectedProgram } = state.programs;
    const { selectedAssessments } = state.assessments;
    const promises = selectedAssessments.map((id) => {
      const url = `${serverApiBase}surveys/${selectedProgram}/questiongroup/${id}/`;
      return deleteRequest(url);
    });

    Promise.all(promises).then(() => {
      dispatch(getAssessments(selectedProgram));
      dispatch(closeAssessmentLoading());
    });
  };
};

export const fetchRespondentTypes = () => {
  return (dispatch) => {
    const url = `${serverApiBase}respondenttype/`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_RESPONDENT_TYPES,
        value: data.results,
      });
    });
  };
};
