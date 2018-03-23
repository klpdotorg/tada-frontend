import Notifications from 'react-notification-system-redux';
import { TOGGLE_MODAL, SET_USER_PROFILE } from './types';
import { baseNotification, modifySelf, toggleModal } from './index';

export const setUserProfile = () => {
  return (dispatch) => {
    const user = JSON.parse(sessionStorage.getItem('user'));

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

export const changeUserInfo = (email, firstname, lastname) => {
  return (dispatch) => {
    dispatch(toggleModal('changeUserModal'));
    dispatch(modifySelf(email, firstname, lastname))
      .then(() => {
        dispatch(Notifications.success({
          ...baseNotification,
          title: 'User profile modified',
          message: 'User profile modified successfully!',
        }));
      })
      .catch((error) => {
        dispatch(Notifications.error({
          ...baseNotification,
          title: 'Error',
          message: `Could not modify user profile. ERROR: ${error}`,
        }));
      });
  };
};
