import { SERVER_API_BASE } from 'config';
import { get } from './requests';
import { SET_QUESTIONS, SHOW_QUESTION_LOADING, HIDE_QUESTION_LOADING } from './types';
import { setPrograms, selectProgram, setAssessments } from './index';

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

export const getQuestions = (programId, assessmentId) => {
  return (dispatch) => {
    dispatch(showQuestionLoading());

    const getQuestionsURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions/`;
    get(getQuestionsURL).then((response) => {
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
      console.log(programResponse);
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
