import { SERVER_API_BASE } from 'config';
import { get, post } from './requests';
import { SET_QUESTIONS, SHOW_QUESTION_LOADING, HIDE_QUESTION_LOADING, TOGGLE_MODAL } from './types';
import { setPrograms, selectProgram, setAssessments } from './index';

export const openCreateQuestionModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createQuestion',
  };
};

export const setQuestions = (value, assessmentId) => {
  return {
    type: SET_QUESTIONS,
    value,
    assessmentId,
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
      dispatch(setQuestions(response.results, assessmentId));
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
    post(createQuestionURL, data).then(() => {
      dispatch(getQuestions(programId, assessmentId));
    });
  };
};
