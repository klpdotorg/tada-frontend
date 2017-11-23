import { SERVER_API_BASE } from 'config';
import { get } from './requests';
import { SET_QUESTIONS } from './types';

export const setQuestions = (value, assessmentId) => {
  return {
    type: SET_QUESTIONS,
    value,
    assessmentId,
  };
};

export const GetQuestion = (programId, assessmentId) => {
  return (dispatch) => {
    const getQuestionsURL = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/questions`;
    get(getQuestionsURL).then((response) => {
      dispatch(setQuestions(response.results, assessmentId));
    });
  };
};
