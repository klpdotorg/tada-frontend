import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';

import { SET_QUESTION_TYPES } from './types';

import { get } from './requests';
import { errorNotification } from './notifications';

export const fetchQuestionTypes = () => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}surveys/questiontype/`;
    get(url).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        dispatch({
          type: SET_QUESTION_TYPES,
          value: data.results,
        });
      } else {
        Notifications.error(errorNotification('Error!', 'Error in fetching question types'));
      }
    });
  };
};
