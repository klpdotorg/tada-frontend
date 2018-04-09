import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE } from 'config';
import { isEmpty } from 'lodash';
import { TOGGLE_MODAL, SET_USER_PROFILE } from './types';
import { baseNotification, setDataInLocalStorage, getDataFromLocalstorage } from './index';
import { put } from './requests';

export const setUserProfile = () => {
  return (dispatch) => {
    const user = getDataFromLocalstorage();

    const newUser = {
      email: user.email,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      mobileNo: user.mobile_no,
    };

    dispatch({
      type: SET_USER_PROFILE,
      value: newUser,
    });
  };
};

export const openChangeUserInfoModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'changeUserModal',
  };
};

export const changeUserInfo = (data) => {
  return (dispatch) => {
    dispatch(openChangeUserInfoModal());

    const url = `${SERVER_API_BASE}users/profile`;
    put(url, data).then((res) => {
      if (!isEmpty(res)) {
        dispatch(setDataInLocalStorage(res));
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
