import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE } from 'config';
import isEmpty from 'lodash.isempty';

import { TOGGLE_MODAL, SET_USER_PROFILE } from './types';
import { baseNotification, setDataInLocalStorage, getDataFromLocalstorage } from './index';
import { put } from './requests';

export const setUserProfile = () => {
  return (dispatch) => {
    const user = getDataFromLocalstorage();
    dispatch({
      type: SET_USER_PROFILE,
      value: user,
    });
  };
};

export const openChangeUserInfoModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'changeUserModal',
  };
};

export const changeUserInfo = (body) => {
  return (dispatch) => {
    dispatch(openChangeUserInfoModal());

    const url = `${SERVER_API_BASE}users/profile`;
    put(url, body).then(({ data }) => {
      if (!isEmpty(data)) {
        dispatch(setDataInLocalStorage(data));
        dispatch(Notifications.success({
          ...baseNotification,
          title: 'Profile updated!',
          message: 'Profile updated successfully.',
        }));
      } else {
        dispatch(Notifications.error({
          ...baseNotification,
          title: 'Profile not updated!',
          message: 'Please check your form values.',
        }));
      }
    });
  };
};
