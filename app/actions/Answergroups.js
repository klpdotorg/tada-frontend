import { SERVER_API_BASE } from 'config';
import isArray from 'lodash.isarray';
import getObject from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { convertArrayToObject } from '../utils';
import { get, patch, put } from './requests';
import { FETCHING_ANSWER_GROUPS, SET_ANSWER_GROUPS } from './types';
import { fetchAnswers, editAnswers, showAnswerError, resetAnswerError } from './index';

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
        value.forEach((item) => {
          if (!isEmpty(item)) {
            const studentId = getObject(item, '[0].student', '');
            dispatch({
              type: SET_ANSWER_GROUPS,
              value: {
                [studentId]: convertArrayToObject(item),
              },
            });
            dispatch(fetchAnswers(assessmentId, studentId));
          }
        });
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
    const { assessmentId, answergroupId, boundaryId } = params;
    const { selectedProgram } = state.programs;
    const name = getObject(state.assessmentEntry.groupValues, [answergroupId], '');
    const dateOfVisit = getObject(state.assessmentEntry.dateOfVisits, [answergroupId], new Date());
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${answergroupId}/`;

    put(url, {
      [params.boundaryType]: boundaryId,
      group_value: name,
      date_of_visit: dateOfVisit,
      questiongroup: assessmentId,
      institution_images: [],
      status: 'AC',
    }).then((response) => {
      if (response.status === 200) {
        dispatch(editAnswers({ ...params, answergroupId: response.data.id }));
        dispatch(resetAnswerError());
      } else {
        dispatch(showAnswerError(response.data));
      }
    });
  };
};
