import { SERVER_API_BASE } from 'config';

import { map } from 'lodash';
import { post, get } from './requests';
import { SET_ANSWERS } from './types';

export const createAnswergroup = (url, body) => {
  return post(url, body);
};

export const fetchAnswers = (assessmentId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { answergroups } = state.answergroups;
    const { selectedProgram } = state.programs;

    const Ids = Object.keys(answergroups);
    const promises = Ids.map((Id) => {
      const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroups/${assessmentId}/answergroups/${Id}/answers/`;
      return get(url).then((res) => {
        return {
          id: Id,
          value: res.results,
        };
      });
    });

    Promise.all(promises).then((response) => {
      dispatch({
        type: SET_ANSWERS,
        value: response.reduce((soFar, value) => {
          const result = soFar;
          result[value.id] = value.value;

          return result;
        }, {}),
      });
    });
  };
};

const filterAnswers = (answers) => {
  return map(answers, (val, key) => {
    return {
      question: key,
      answer: val.value,
    };
  });
};

export const saveAnswer = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { assessmentId, boundaryId, answergroupId } = params;
    const { answers } = state.assessmentEntry;
    const { selectedProgram } = state.programs;
    const filteredAnswers = filterAnswers(answers[boundaryId]);

    console.log(
      assessmentId,
      boundaryId,
      answergroupId,
      JSON.stringify(filteredAnswers),
      'printing this information',
    );
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroups/${assessmentId}/answergroups/${answergroupId}/answers/`;
    post(url, filteredAnswers).then((res) => {
      console.log(res);
    });
  };
};

// Create Answergroup for posting answers

// http://localhost:8000/api/v1/surveys/3/questiongroup/1/answergroup/
export const createAnswerGroup = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { assessmentId, boundaryId } = params;
    const { selectedProgram } = state.programs;
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroups/${assessmentId}/answergroups/`;

    post(url, {
      institution: boundaryId,
      status: 'AC',
    }).then((res) => {
      dispatch(saveAnswer({ ...params, answergroupId: res.id }));
    });
  };
};
