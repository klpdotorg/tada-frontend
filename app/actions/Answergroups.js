import { SERVER_API_BASE } from 'config';
import flatten from 'lodash.flatten';
import isArray from 'lodash.isarray';

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

export const getAnswerGroups = (params) => {
  const { assessmentId, programId, boundaryId, boundaryType } = params;
  const url = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/answergroups/?${boundaryType}_id=${boundaryId}&per_page=10`;
  return get(url).then(({ data }) => {
    return data.results;
  });
};

export const fetchAnswerGroups = (assessmentId, boundaryType, boundaryId) => {
  return (dispatch, getState) => {
    dispatch(fetchingAnswergroups(true));

    const state = getState();
    const { selectedProgram } = state.programs;
    if (isArray(boundaryId)) {
      const params = {
        assessmentId,
        programId: selectedProgram,
        boundaryType,
      };
      const promises = boundaryId.map((id) => {
        return getAnswerGroups({ ...params, boundaryId: id });
      });

      Promise.all(promises).then((value) => {
        console.log(value, boundaryId);
        const updateValue = flatten(value);
        // dispatch({
        //   type: SET_ANSWER_GROUPS,
        //   value: {
        //     [boundaryId]: convertArrayToObject(updateValue),
        //   },
        // });
        dispatch(fetchAnswers(assessmentId));
        dispatch(fetchingAnswergroups(false));
      });
    } else {
      const params = {
        assessmentId,
        programId: selectedProgram,
        boundaryType,
        boundaryId,
      };
      getAnswerGroups(params).then((response) => {
        dispatch({
          type: SET_ANSWER_GROUPS,
          value: {
            [boundaryId]: convertArrayToObject(response),
          },
        });
        dispatch(fetchAnswers(assessmentId));
        dispatch(fetchingAnswergroups(false));
      });
    }
  };
};
