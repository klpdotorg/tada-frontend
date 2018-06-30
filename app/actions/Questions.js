import { SERVER_API_BASE } from 'config';
import getObject from 'lodash.get';

import { get, post, put, deleteRequest } from './requests';
import {
  SET_QUESTION,
  SET_QUESTIONS,
  SHOW_QUESTION_LOADING,
  HIDE_QUESTION_LOADING,
  TOGGLE_MODAL,
  SET_EDIT_QUESTION_ID,
  DELETE_QUESTION,
  CREATE_QUESTION_ERROR,
} from './types';
import { setPrograms, selectProgram, setAssessments } from './index';

export const toggleEditQuestionModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'editQuestion',
  };
};

export const openEditQuestionForm = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_EDIT_QUESTION_ID,
      value,
    });
    dispatch({
      type: CREATE_QUESTION_ERROR,
      value: {},
    });
    dispatch(toggleEditQuestionModal());
  };
};

export const toggleCreateQuestionModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createQuestion',
    });
    dispatch({
      type: CREATE_QUESTION_ERROR,
      value: {},
    });
  };
};

export const setQuestions = (value) => {
  return (dispatch) => {
    const entities = value.reduce((soFar, entity) => {
      const result = soFar;
      result[entity.id] = entity;

      return result;
    }, {});

    dispatch({
      type: SET_QUESTIONS,
      value: entities,
    });
  };
};

export const showQuestionLoading = () => {
  return {
    type: SHOW_QUESTION_LOADING,
  };
};

export const hideQuestionLoading = () => {
  return {
    type: HIDE_QUESTION_LOADING,
  };
};

export const fetchQuestions = (getQuestionsURL) => {
  return get(getQuestionsURL);
};

export const getQuestions = (programId, assessmentId) => {
  return (dispatch) => {
    dispatch(showQuestionLoading());

    const getQuestionsURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/`;
    fetchQuestions(getQuestionsURL).then(({ data }) => {
      dispatch(setQuestions(data.results));
      dispatch(hideQuestionLoading());
    });
  };
};

export const getQuestionParentEntities = (programId, assessmentId) => {
  return (dispatch) => {
    dispatch(showQuestionLoading());

    const fetchProgramsUrl = `${SERVER_API_BASE}surveys/`;

    get(fetchProgramsUrl).then(({ data }) => {
      dispatch(setPrograms(data.results));
      dispatch(selectProgram(programId));

      const fetchAssessmentsURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/`;
      get(fetchAssessmentsURL).then((response) => {
        const { results } = response.data;
        dispatch(setAssessments(results));
        dispatch(getQuestions(programId, assessmentId));
        dispatch(hideQuestionLoading());
      });
    });
  };
};

export const createNewQuestion = (data, programId, assessmentId) => {
  return (dispatch) => {
    const createQuestionURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/`;
    post(createQuestionURL, data).then((response) => {
      if (response.status === 201) {
        const { question_details } = response.data;
        dispatch({
          type: SET_QUESTION,
          value: { [question_details.id]: question_details },
        });
        dispatch({
          type: TOGGLE_MODAL,
          modal: 'createQuestion',
        });
        dispatch({
          type: CREATE_QUESTION_ERROR,
          value: {},
        });
      } else {
        dispatch({
          type: CREATE_QUESTION_ERROR,
          value: getObject(response.data, 'question_details', response.data),
        });
      }
    });
  };
};

export const saveQuestion = (question, programId, assessmentId, questionId) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editQuestion',
    });

    dispatch(showQuestionLoading());
    const editQuestionURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/${questionId}/`;
    put(editQuestionURL, question).then(({ data }) => {
      dispatch({
        type: SET_QUESTION,
        value: { [data.id]: data },
      });
      dispatch(hideQuestionLoading());
    });
  };
};

export const deleteQuestion = (assessmentId, questionId) => {
  return (dispatch, getState) => {
    dispatch(showQuestionLoading());
    const state = getState();
    const { selectedProgram } = state.programs;

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/questions/${questionId}/`;
    deleteRequest(url).then(() => {
      dispatch({
        type: DELETE_QUESTION,
        value: questionId,
      });
      dispatch(hideQuestionLoading());
    });
  };
};
