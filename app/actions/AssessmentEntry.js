import { isEmpty } from 'lodash';
import { SERVER_API_BASE } from 'config';

import {
  SELECT_PROGRAM_ASSESSMENT,
  SET_ASSESSMENT_ENTRY_BOUNDARIES,
  SET_BOUNDARIES,
  CHANGE_ASSESSMENT_ENTRY_ANSWERS,
  SHOW_ASSESSMENT_ENTRY_LOADING,
  HIDE_ASSESSMENT_ENTRY_LOADING,
  SHOW_ANSWERS_LOADING,
  HIDE_ANSWERS_LOADING,
} from './types';
import { get } from './requests';
import { fetchAllPrograms, setQuestions, setPrograms } from './index';
import { getEntityType, convertEntitiesToObject } from '../utils';

export const showAssessmentEntryLoading = () => {
  return {
    type: SHOW_ASSESSMENT_ENTRY_LOADING,
  };
};

export const hideAssessmentEntryLoading = () => {
  return {
    type: HIDE_ASSESSMENT_ENTRY_LOADING,
  };
};

export const showAnswersLoading = () => {
  return {
    type: SHOW_ANSWERS_LOADING,
  };
};

export const hideAnswersLoading = () => {
  return {
    type: HIDE_ANSWERS_LOADING,
  };
};

export const onChangeAssessmentEntry = (value, id) => {
  return {
    type: CHANGE_ASSESSMENT_ENTRY_ANSWERS,
    id,
    value,
  };
};

export const fetchAssessmentEntryResources = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { programs } = state.programs;

    if (isEmpty(programs)) {
      dispatch(showAssessmentEntryLoading());
      fetchAllPrograms().then((res) => {
        dispatch(setPrograms(res));
        dispatch(hideAssessmentEntryLoading());
      });
    }
  };
};

export const selectProgramAssessment = (value, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const { uncollapsedEntities, programDetails } = state.programDetails;
    const lastBoundaryDepth = depth;
    const lastBoundaryUniqueId = uncollapsedEntities[lastBoundaryDepth];
    const lastBoundary = programDetails[lastBoundaryUniqueId];
    const type = getEntityType(lastBoundary);

    dispatch({
      type: SELECT_PROGRAM_ASSESSMENT,
      value: {
        assessmentId: value,
        boundaryId: lastBoundary.id,
        boundaryType: type,
      },
    });
    dispatch(fetchSelectedAssessmentQuestions());
  };
};

const getURL = (type, boundaryId) => {
  switch (type) {
    case 'institution':
      return `${SERVER_API_BASE}institutions/${boundaryId}/studentgroups/`;
    case 'class':
      return `${SERVER_API_BASE}studentgroups/${boundaryId}/students/`;
    default:
      return null;
  }
};

export const fetchSelectedAssessmentQuestions = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgramAssess } = state.assessmentEntry;
    const { selectedProgram } = state.programs;

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroups/${selectedProgramAssess.assessmentId}/questions/`;

    return get(url).then((response) => {
      dispatch(setQuestions(response.results, selectedProgramAssess.assessmentId));
      dispatch(hideAnswersLoading());
    });
  };
};

export const fetchSelectedAssessmentBoundary = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgramAssess } = state.assessmentEntry;
    const url = getURL(selectedProgramAssess.boundaryType, selectedProgramAssess.boundaryId);

    get(url).then((res) => {
      const entities = convertEntitiesToObject(res.results);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch({
        type: SET_ASSESSMENT_ENTRY_BOUNDARIES,
        value: Object.keys(entities),
      });
      dispatch(fetchSelectedAssessmentQuestions());
    });
  };
};

export const fetchAnswers = () => {
  return (dispatch) => {
    dispatch(showAnswersLoading());
    dispatch(fetchSelectedAssessmentBoundary());
  };
};
