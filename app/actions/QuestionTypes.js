import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';
import uniqBy from 'lodash.uniqby';

import { SET_QUESTION_TYPES } from './types';

import { get } from './requests';
import { errorNotification } from './notifications';

const filterTypes = (types) => {
  return uniqBy(types, 'display');
};

export const fetchQuestionTypes = () => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}surveys/questiontype/`;
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
  };
};
