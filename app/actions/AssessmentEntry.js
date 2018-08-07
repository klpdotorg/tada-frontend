import isEmpty from 'lodash.isempty';
import getObject from 'lodash.get';
import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';

import {
  SELECT_PROGRAM_ASSESSMENT,
  SET_ASSESSMENT_ENTRY_BOUNDARIES,
  SET_BOUNDARIES,
  CHANGE_ASSESSMENT_ENTRY_ANSWERS,
  SHOW_ASSESSMENT_ENTRY_LOADING,
  HIDE_ASSESSMENT_ENTRY_LOADING,
  SHOW_ANSWERS_LOADING,
  HIDE_ANSWERS_LOADING,
  SET_ASSESSMENT_ENTRY_STUDENTS,
  ON_CHANGE_GROUP_VALUE,
  ON_CHANGE_DATE_OF_VISITS,
  ON_CHANGE_COMMENTS,
  SET_ANSWER_PAGINATION_COUNT,
} from './types';
import { get } from './requests';
import {
  fetchAllPrograms,
  setQuestions,
  setPrograms,
  getProgramEntities,
  fetchAnswerGroups,
} from './index';
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

export const onChangeGroupValue = (id, value) => {
  return {
    type: ON_CHANGE_GROUP_VALUE,
    value: {
      [id]: value,
    },
  };
};

export const onChangeDateOfVisit = (id, value) => {
  return {
    type: ON_CHANGE_DATE_OF_VISITS,
    value: {
      [id]: value,
    },
  };
};

export const onChangeComments = (id, value) => {
  return {
    type: ON_CHANGE_COMMENTS,
    value: {
      [id]: value,
    },
  };
};

export const onChangeAssessmentEntry = (value, entityId, questionId) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ASSESSMENT_ENTRY_ANSWERS,
      id: entityId,
      value: {
        [questionId]: {
          value,
        },
      },
    });
  };
};

export const fetchAssessmentEntryResources = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { programs } = state.programs;
    const { state_code } = state.profile;

    if (isEmpty(programs)) {
      dispatch(showAssessmentEntryLoading());
      fetchAllPrograms(state_code).then((res) => {
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

const fetchQuestions = (programId, assessmentId) => {
  const url = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/`;

  return get(url);
};

export const fetchSelectedAssessmentQuestions = (assessmentId, entities, programId) => {
  return (dispatch, getState) => {
    dispatch(showAnswersLoading());
    const state = getState();
    const { state_code } = state.profile;
    const { selectedProgram } = state.programs;
    if (!selectedProgram) {
      fetchAllPrograms(state_code).then((results) => {
        dispatch(setPrograms(results, programId));
        dispatch(getProgramEntities(entities));

        const id = getObject(results[0], 'id', '');
        fetchQuestions(id, assessmentId).then(({ data }) => {
          dispatch(setQuestions(data.results, assessmentId));
          dispatch(hideAnswersLoading());
        });
      });
    } else {
      fetchQuestions(selectedProgram, assessmentId).then(({ data }) => {
        dispatch(setQuestions(data.results, assessmentId));
        dispatch(hideAnswersLoading());
      });
    }
  };
};

export const fetchSelectedAssessmentBoundary = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgramAssess } = state.assessmentEntry;
    const url = getURL(selectedProgramAssess.boundaryType, selectedProgramAssess.boundaryId);

    get(url).then(({ data }) => {
      const entities = convertEntitiesToObject(data.results);
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

export const fetchStudentsForAssessmentEntry = (id) => {
  return (dispatch, getState) => {
    dispatch(showAssessmentEntryLoading());

    const state = getState();
    const { current } = state.answerPagination;
    let studentGroupId = '';
    if (typeof id === 'object') {
      studentGroupId = id.boundaryId;
    } else {
      studentGroupId = id;
    }

    const url = `${SERVER_API_BASE}studentgroups/${studentGroupId}/students/?per_page=10&page=${current}`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_ASSESSMENT_ENTRY_STUDENTS,
        value: data.results,
      });
      dispatch({
        type: SET_ANSWER_PAGINATION_COUNT,
        value: data.count,
      });
      dispatch(hideAssessmentEntryLoading());
      if (typeof id === 'object') {
        const { assessmentId } = id;
        const Ids = data.results.map((value) => {
          return value.id;
        });
        dispatch(fetchAnswerGroups(assessmentId, 'student', Ids));
      }
    });
  };
};

export const resetFilterByProgramRoute = () => {
  return (dispatch) => {
    dispatch(push('/filterprograms'));
  };
};
