import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';

import { SET_QUESTION_GROUP_TYPES } from './types';

import { get } from './requests';
import { errorNotification } from './notifications';

const filterTypes = (types) => {
  return types.map((type) => {
    return {
      value: type.char_id,
      label: type.description,
    };
  });
};

export const fetchQuestiongroupTypes = () => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}survey-type/`;
    get(url).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        const types = filterTypes(data.results);
        dispatch({
          type: SET_QUESTION_GROUP_TYPES,
          value: types,
        });
      } else {
        Notifications.error(errorNotification('Error!', 'Error in fetching question types'));
      }
    });
  };
};
