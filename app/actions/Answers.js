import { SERVER_API_BASE } from 'config';

import getObject from 'lodash.get';
import map from 'lodash.map';
import { post, get, put } from './requests';
import { SET_ANSWERS, FETCHING_ANSWERS, ON_CHANGE_ANSWER } from './types';

export const onChangeAnswer = (answergroupId, answerId, value) => {
  return (dispatch, getState) => {
    const state = getState();
    const answergroup = getObject(state.answers.answers, [answergroupId], []);
    const answers = answergroup.map((answer) => {
      if (answer.id === answerId) {
        return {
          ...answer,
          answer: value,
        };
      }
      return answer;
    });

    dispatch({
      type: ON_CHANGE_ANSWER,
      value: {
        [answergroupId]: answers,
      },
    });
  };
};

export const createAnswergroup = (url, body) => {
  return post(url, body);
};

export const fetchAnswers = (assessmentId) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCHING_ANSWERS,
      value: true,
    });
    const state = getState();
    const { answergroups } = state.answergroups;
    const { selectedProgram } = state.programs;

    const Ids = Object.keys(answergroups);
    const promises = Ids.map((Id) => {
      const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${Id}/answers/`;
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
      dispatch({
        type: FETCHING_ANSWERS,
        value: false,
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

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${answergroupId}/answers/`;
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
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/`;

    post(url, {
      institution: boundaryId,
      status: 'AC',
    }).then((res) => {
      dispatch(saveAnswer({ ...params, answergroupId: res.id }));
    });
  };
};

export const editAnswers = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgram } = state.programs;
    const { answergroupId, assessmentId } = params;
    const answers = get(state.answers.answers, answergroupId, []);
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${answergroupId}/answers`;

    put(url, answers).then((res) => {
      console.log(res, 'This is done');
    });
  };
};
