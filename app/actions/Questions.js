import { SERVER_API_BASE } from 'config';
import { get, post, patch, put } from './requests';
import {
  SET_QUESTION,
  SET_QUESTIONS,
  SHOW_QUESTION_LOADING,
  HIDE_QUESTION_LOADING,
  TOGGLE_MODAL,
  SET_EDIT_QUESTION_ID,
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
    dispatch(toggleEditQuestionModal());
  };
};

export const toggleCreateQuestionModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createQuestion',
  };
};

export const setQuestions = (value) => {
  return {
    type: SET_QUESTIONS,
    value,
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
    fetchQuestions(getQuestionsURL).then((response) => {
      const entities = response.results.reduce((soFar, entity) => {
        const result = soFar;
        result[entity.id] = entity;

        return result;
      }, {});

      dispatch(setQuestions(entities));
      dispatch(hideQuestionLoading());
    });
  };
};

export const getQuestionParentEntities = (programId, assessmentId) => {
  return (dispatch) => {
    dispatch(showQuestionLoading());

    const fetchProgramsUrl = `${SERVER_API_BASE}surveys/`;

    get(fetchProgramsUrl).then((programResponse) => {
      dispatch(setPrograms(programResponse.results));
      dispatch(selectProgram(programId));

      const fetchAssessmentsURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/`;
      get(fetchAssessmentsURL).then((assessmentResponse) => {
        dispatch(setAssessments(assessmentResponse.results));
        dispatch(getQuestions(programId, assessmentId));
        dispatch(hideQuestionLoading());
      });
    });
  };
};

export const createNewQuestion = (data, programId, assessmentId) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createQuestion',
    });

    dispatch(showQuestionLoading());
    const createQuestionURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/`;
    post(createQuestionURL, data).then((response) => {
      const { question_details } = response;
      dispatch({
        type: SET_QUESTION,
        value: { [question_details.id]: question_details },
      });
      dispatch(hideQuestionLoading());
    });
  };
};

export const saveQuestion = (data, programId, assessmentId, questionId) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editQuestion',
    });

    dispatch(showQuestionLoading());
    const editQuestionURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/${questionId}/`;
    put(editQuestionURL, data).then((response) => {
      dispatch({
        type: SET_QUESTION,
        value: { [response.id]: response },
      });
      dispatch(hideQuestionLoading());
    });
  };
};
