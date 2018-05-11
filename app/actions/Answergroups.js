import { SERVER_API_BASE } from 'config';

import { convertArrayToObject } from '../utils';
import { get } from './requests';
import { FETCHING_ANSWER_GROUPS, SET_ANSWER_GROUPS } from './types';
import { fetchAnswers } from './index';

export const fetchingAnswergroups = (value) => {
  return {
    type: FETCHING_ANSWER_GROUPS,
    value,
  };
};

export const fetchAnswerGroups = (assessmentId, boundaryType, boundaryId) => {
  return (dispatch, getState) => {
    dispatch(fetchingAnswergroups(true));

    const state = getState();
    const { selectedProgram } = state.programs;

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroups/${assessmentId}/answergroups/?${boundaryType}=${boundaryId}`;

    get(url).then((response) => {
      dispatch({
        type: SET_ANSWER_GROUPS,
        value: convertArrayToObject(response.results),
      });
      dispatch(fetchAnswers(assessmentId));
      dispatch(fetchingAnswergroups(false));
    });
  };
};
