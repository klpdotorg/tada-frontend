import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';
import isEmpty from 'lodash.isempty';

import { SET_QUESTION_TYPES } from './types';

import { get } from './requests';
import { errorNotification } from './notifications';

const ignoreIds = [4, 6, 7];

const filterTypes = (types) => {
  return types.filter((type) => {
    return !ignoreIds.includes(type.id);
  });
};

export const fetchQuestionTypes = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;
    const url = `${SERVER_API_BASE}surveys/questiontype/?state=${state_code}`;
    if (isEmpty(state.questionTypes.types)) {
      get(url).then((response) => {
        if (response.status === 200) {
          const { data } = response;
          const types = filterTypes(data.results);
          dispatch({
            type: SET_QUESTION_TYPES,
            value: types,
          });
        } else {
          Notifications.error(errorNotification('Error!', 'Error in fetching question types'));
        }
      });
    }
  };
};
