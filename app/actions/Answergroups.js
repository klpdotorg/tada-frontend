import { SERVER_API_BASE } from 'config';
import flatten from 'lodash.flatten';
import isArray from 'lodash.isarray';
import getObject from 'lodash.get';

import { convertArrayToObject } from '../utils';
import { get, put } from './requests';
import { FETCHING_ANSWER_GROUPS, SET_ANSWER_GROUPS } from './types';
import { fetchAnswers, editAnswers } from './index';

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
        const updateValue = flatten(value);
        // dispatch({
        //   type: SET_ANSWER_GROUPS,
        //   value: {
        //     [boundaryId]: convertArrayToObject(updateValue),
        //   },
        // });
        dispatch(fetchAnswers(assessmentId, boundaryId));
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
        dispatch(fetchAnswers(assessmentId, boundaryId));
        dispatch(fetchingAnswergroups(false));
      });
    }
  };
};

export const editAnswerGroup = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { assessmentId, boundaryId } = params;
    const { selectedProgram } = state.programs;
    const name = getObject(state.assessmentEntry.groupValues, [boundaryId], '');
    const dateOfVisit = getObject(state.assessmentEntry.dateOfVisits, [boundaryId], new Date());
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/`;

    put(url, {
      [params.boundaryType]: boundaryId,
      group_value: name,
      date_of_visit: dateOfVisit,
      status: 'AC',
    }).then(({ data }) => {
      dispatch(editAnswers({ ...params, answergroupId: data.id }));
    });
  };
};
