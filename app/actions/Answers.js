import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';

import getObject from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { post, get, put } from './requests';
import {
  SET_ANSWERS,
  FETCHING_ANSWERS,
  ON_CHANGE_ANSWER,
  RESET_CREATE_FORM_ENTRY,
  SET_ANSWERS_ERROR,
} from './types';
import { fetchAnswerGroups } from '.';
import { errorNotification, showSuccessMessage } from './notifications';

const resetCreateFormEntry = () => {
  return {
    type: RESET_CREATE_FORM_ENTRY,
  };
};

export const onChangeAnswer = (answergroupId, answerId, value, questionId) => {
  return (dispatch, getState) => {
    const state = getState();
    const answergroup = getObject(state.answers.answers, [answergroupId], []);
    let answers = [];
    if (!answerId) {
      const found = answergroup.find((answer) => {
        return answer.question === questionId;
      });
      if (found) {
        answers = answergroup.map((answer) => {
          if (answer.question === questionId) {
            return {
              ...answer,
              answer: value,
            };
          }

          return answer;
        });
      } else {
        answers = [...answergroup, { answer: value, question: questionId }];
      }
    } else {
      answers = answergroup.map((answer) => {
        if (answer.id === answerId) {
          return {
            ...answer,
            answer: value,
          };
        }

        return answer;
      });
    }

    dispatch({
      type: ON_CHANGE_ANSWER,
      value: {
        [answergroupId]: answers,
      },
    });
  };
};

// export const createAnswergroup = (url, body) => {
//   return post(url, body);
// };

export const fetchAnswers = (assessmentId, boundaryId) => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCHING_ANSWERS,
      value: true,
    });
    const state = getState();
    const { answergroups } = state.answergroups;
    const { selectedProgram } = state.programs;
    const { state_code } = state.profile;

    const Ids = Object.keys(getObject(answergroups, boundaryId, {}));
    const promises = Ids.map((Id) => {
      const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${Id}/answers/?state=${state_code}`;
      return get(url).then(({ data }) => {
        return {
          id: Id,
          value: data.results,
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
  return Object.keys(answers)
    .map((key) => {
      const val = answers[key];
      return {
        question: key,
        answer: val.value,
      };
    })
    .filter((answer) => {
      return answer.answer;
    });
};

export const showAnswerError = (error) => {
  return (dispatch) => {
    dispatch(Notifications.error(errorNotification('Error!', 'Answers not saved!')));
    dispatch({
      type: SET_ANSWERS_ERROR,
      value: error,
    });
  };
};

export const resetAnswerError = () => {
  return {
    type: SET_ANSWERS_ERROR,
    value: {},
  };
};

export const saveAnswer = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { assessmentId, boundaryId, answergroupId, boundaryType } = params;
    const { answers } = state.assessmentEntry;
    const { selectedProgram } = state.programs;
    const filteredAnswers = filterAnswers(answers[boundaryId]);
    const { state_code } = state.profile;

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${answergroupId}/answers/?per_page=10&state=${state_code}`;
    post(url, filteredAnswers).then((response) => {
      if (response.status === 201) {
        dispatch(fetchAnswerGroups(assessmentId, boundaryType, boundaryId));
        dispatch(resetCreateFormEntry());
        dispatch(resetAnswerError());
        dispatch(Notifications.success(showSuccessMessage('Answers Save!', 'Answers successfully saved!')));
      } else {
        dispatch(showAnswerError(response.data));
      }
    });
  };
};

export const validateAnswergroup = (params, assessment) => {
  const { name, comment } = params;
  const commentRequired = getObject(assessment, 'comments_required');
  const groupText = getObject(assessment, 'group_text');
  const result = [];

  if (groupText && !name) {
    result.push('name');
  }

  if (commentRequired && !comment) {
    result.push('comment');
  }

  return result;
};

// Create Answergroup for posting answers

// http://localhost:8000/api/v1/surveys/3/questiongroup/1/answergroup/
export const createAnswerGroup = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { assessmentId, boundaryId } = params;
    const { selectedProgram } = state.programs;
    const { state_code } = state.profile;
    const { id } = state.profile;
    const name = getObject(state.assessmentEntry.groupValues, [boundaryId], '');
    const dateOfVisit = getObject(state.assessmentEntry.dateOfVisits, [boundaryId], new Date());
    const respondentType = getObject(state.assessmentEntry.respondentTypeVals, [boundaryId], '');
    const comment = getObject(state.assessmentEntry.comments, [boundaryId], '');
    const assessment = getObject(state.assessments.assessments, assessmentId, {});
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/?state=${state_code}`;

    const result = validateAnswergroup(
      {
        name,
        comment,
        assessmentId,
      },
      assessment,
    );

    if (isEmpty(result)) {
      post(url, {
        [params.boundaryType]: boundaryId,
        group_value: name,
        date_of_visit: dateOfVisit,
        institution_images: [],
        questiongroup: assessmentId,
        comments: comment,
        created_by: id,
        status: 'AC',
        respondent_type: respondentType,
      }).then((response) => {
        if (response.status === 201) {
          dispatch(saveAnswer({ ...params, answergroupId: response.data.id }));
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

const filterExistingAnswers = (answers) => {
  return answers.reduce((soFar, value) => {
    const result = soFar;
    if (value.id) {
      if (!result.existingAnswers) {
        result.existingAnswers = [];
      }
      result.existingAnswers = [...result.existingAnswers, value];
    } else {
      if (!result.newAnswers) {
        result.newAnswers = [];
      }
      result.newAnswers = [...result.newAnswers, value];
    }
    return result;
  }, {});
};

export const editAnswers = (params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgram } = state.programs;
    const { answergroupId, assessmentId, boundaryId, boundaryType } = params;
    const { state_code } = state.profile;
    const answers = getObject(state.answers.answers, answergroupId, []);
    const { existingAnswers, newAnswers } = filterExistingAnswers(answers);
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${assessmentId}/answergroups/${answergroupId}/answers/?state=${state_code}`;
    if (!isEmpty(existingAnswers)) {
      put(url, existingAnswers).then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(fetchAnswerGroups(assessmentId, boundaryType, boundaryId));
          dispatch(resetAnswerError());
          dispatch(Notifications.success(showSuccessMessage('Answers Edit!', 'Answers successfully edited!')));
        } else {
          dispatch(showAnswerError(response.data));
        }
      });
    }

    if (!isEmpty(newAnswers)) {
      post(url, newAnswers).then((response) => {
        if (response.status === 201) {
          dispatch(fetchAnswerGroups(assessmentId, boundaryType, boundaryId));
          dispatch(resetCreateFormEntry());
          dispatch(resetAnswerError());
          dispatch(Notifications.success(showSuccessMessage('Answers Save!', 'Answers successfully saved!')));
        } else {
          dispatch(showAnswerError(response.data));
        }
      });
    }

    if (isEmpty(existingAnswers) && isEmpty(newAnswers)) {
      dispatch(resetAnswerError());
      dispatch(Notifications.success(showSuccessMessage('Answers Save!', 'Answers successfully saved!')));
    }
  };
};
