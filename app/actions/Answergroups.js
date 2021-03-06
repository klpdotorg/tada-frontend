import { SERVER_API_BASE } from 'config';
import getObject from 'lodash.get';
import isEmpty from 'lodash.isempty';
import Notifications from 'react-notification-system-redux';

import { convertArrayToObject } from '../utils';
import { get, put } from './requests';
import {
  FETCHING_ANSWER_GROUPS,
  SET_ANSWER_GROUPS,
  SET_ANSWER_PAGINATION_COUNT,
  RESET_ANSWERGROUPS,
} from './types';
import {
  fetchAnswers,
  editAnswers,
  showAnswerError,
  resetAnswerError,
  validateAnswergroup,
} from './index';
import { errorNotification } from './notifications';

export const fetchingAnswergroups = (value) => {
  return {
    type: FETCHING_ANSWER_GROUPS,
    value,
  };
};

export const getAnswerGroups = (params, current, stateCode) => {
  const { assessmentId, programId, boundaryId, boundaryType } = params;
  let url = '';

  if (!current) {
    url = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/answergroups/?${boundaryType}_id=${boundaryId}&state=${stateCode}`;
  } else {
    url = `${SERVER_API_BASE}surveys/${programId}/questiongroup/${assessmentId}/answergroups/?${boundaryType}_id=${boundaryId}&per_page=10&page=${current}&state=${stateCode}`;
  }

  return get(url).then(({ data }) => {
    return data;
  });
};

export const fetchAnswerGroups = (assessmentId, boundaryType, boundaryId) => {
  return (dispatch, getState) => {
    dispatch(fetchingAnswergroups(true));
    const state = getState();
    const { current } = state.answerPagination;
    const { selectedProgram, programs } = state.programs;
    const program = getObject(programs, selectedProgram, {});
    const { state_code } = state.profile;

    if (program.survey_on === 'student') {
      const params = {
        assessmentId,
        programId: selectedProgram,
        boundaryType,
      };
      const boundaryIds = typeof boundaryId === 'object' ? boundaryId : [boundaryId];
      const promises = boundaryIds.map((id) => {
        return getAnswerGroups({ ...params, boundaryId: id }, 0, state_code);
      });

      Promise.all(promises).then((value) => {
        value.forEach((item) => {
          if (!isEmpty(item)) {
            const studentId = getObject(item.results, '[0].student', '');
            dispatch({
              type: SET_ANSWER_GROUPS,
              value: {
                [studentId]: convertArrayToObject(item.results),
              },
            });
            dispatch(fetchAnswers(assessmentId, studentId));
          }
        });
        dispatch(fetchingAnswergroups(false));
      });
    } else {
      dispatch({
        type: RESET_ANSWERGROUPS,
      });
      const params = {
        assessmentId,
        programId: selectedProgram,
        boundaryType,
        boundaryId,
      };
      getAnswerGroups(params, current).then((response) => {
        dispatch({
          type: SET_ANSWER_GROUPS,
          value: {
            [boundaryId]: convertArrayToObject(response.results),
          },
        });
        dispatch({
          type: SET_ANSWER_PAGINATION_COUNT,
          value: response.count,
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
    const comment = getObject(state.assessmentEntry.comments, [answergroupId], '');
    const respondentType = getObject(state.assessmentEntry.respondentTypeVals, [answergroupId], '');
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${answergroupId}/`;
    const assessment = getObject(state.assessments.assessments, assessmentId, {});

    const result = validateAnswergroup(
      {
        name,
        comment,
        assessmentId,
      },
      assessment,
    );

    if (isEmpty(result)) {
      put(url, {
        [params.boundaryType]: boundaryId,
        group_value: name,
        date_of_visit: dateOfVisit,
        questiongroup: assessmentId,
        comments: comment,
        institution_images: [],
        status: 'AC',
        respondent_type: respondentType,
      }).then((response) => {
        if (response.status === 200) {
          dispatch(editAnswers({ ...params, answergroupId: response.data.id }));
          dispatch(resetAnswerError());
        } else {
          dispatch(showAnswerError(response.data));
        }
      });
    } else {
      dispatch(Notifications.error(errorNotification('Error!', `Please fill all these fields: ${result.join(', ')}.`)));
    }
  };
};
