import Notifications from 'react-notification-system-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';
import _ from 'lodash';

import {
  OPEN_CONFIRM_PASSWORD_MODAL,
  OPEN_CHANGE_PASSWORD_MODAL,
  OPEN_CHANGE_USER_MODAL,
  CLOSE_CONFIRM_PASSWORD_MODAL,
  CLOSE_CHANGE_PASSWORD_MODAL,
  CLOSE_CHANGE_USER_MODAL,
  SET_CURRENT_PASSWORD,
  SET_PASSWORD_ERROR,
  ENABLE_CONFIRM_PASSWORD_FORM,
  DISABLE_CONFIRM_PASSWORD_FORM,
  ENABLE_CHANGE_PASSWORD_FORM,
  ENABLE_CHANGE_USER_INFO_FORM,
  DISABLE_CHANGE_PASSWORD_FORM,
  DISABLE_CHANGE_USER_INFO_FORM,
  SUGGESTION_RESULTS,
} from '../actions/types';
import { checkUserPassword, baseNotification, changePassword, modifySelf } from './index';
import { capitalize } from '../utils';

const searchAPI = `${serverApiBase}searchklp/?klp_id=`;

export const openConfirmPasswordModal = () => ({
  type: OPEN_CONFIRM_PASSWORD_MODAL,
});

export const openChangePasswordModal = () => ({
  type: OPEN_CHANGE_PASSWORD_MODAL,
});

export const openChangeUserInfoModal = () => ({
  type: OPEN_CHANGE_USER_MODAL,
});

export const closeConfirmPasswordModal = () => ({
  type: CLOSE_CONFIRM_PASSWORD_MODAL,
});

export const closeChangePasswordModal = () => ({
  type: CLOSE_CHANGE_PASSWORD_MODAL,
});

export const closeChangeUserInfoModal = () => ({
  type: CLOSE_CHANGE_USER_MODAL,
});

export const setCurrentPassword = value => ({
  type: SET_CURRENT_PASSWORD,
  value,
});

export const setPasswordError = value => ({
  type: SET_PASSWORD_ERROR,
  value,
});

export const enableConfirmPasswordForm = () => ({
  type: ENABLE_CONFIRM_PASSWORD_FORM,
});

export const enableChangePasswordForm = () => ({
  type: ENABLE_CHANGE_PASSWORD_FORM,
});

export const enableChangeUserInfoForm = () => ({
  type: ENABLE_CHANGE_USER_INFO_FORM,
});

export const disableConfirmPasswordForm = () => ({
  type: DISABLE_CONFIRM_PASSWORD_FORM,
});

export const disableChangePassworForm = () => ({
  type: DISABLE_CHANGE_PASSWORD_FORM,
});

export const disableChangeUserInfoForm = () => ({
  type: DISABLE_CHANGE_USER_INFO_FORM,
});

export const setSuggestionResults = results => ({
  type: SUGGESTION_RESULTS,
  results,
});

export const filterSearchData = data => {
  const institutions = _.map(data.institutions, item => ({
    label: `${'Institution'} - ${item.id} - ${capitalize(item.name)}`,
    value: item.id,
    type: 'institution',
    boundaryDetails: item.boundary_details,
  }));

  const students = _.map(data.students, item => {
    const name = capitalize(`${item.first_name} ${item.last_name}`);

    return {
      label: `${'Student'} - ${item.id} - ${name}`,
      value: item.id,
      type: 'student',
      boundaryDetails: item.boundary_details,
    };
  });

  return [...institutions, ...students];
};

export const handleSearchText = query => dispatch => {
  fetch(`${searchAPI}${query}`).then(resp => resp.json()).then(json => {
    dispatch(setSuggestionResults(filterSearchData(json)));
  });
};

export const confirmCurrentPwd = pwd => dispatch => {
  dispatch(checkUserPassword)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.closePasswordModal();
        dispatch(closeConfirmPasswordModal());
        dispatch(setCurrentPassword(pwd));
        dispatch(openChangePasswordModal());
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .catch(() => {
      dispatch(
        Notifications.error({
          ...baseNotification,
          title: 'Password Invalid',
          message: 'Current password not valid! Please try again!',
        }),
      );
    });
};

export const changePwd = newPass => (dispatch, getState) => {
  const currentPassword = getState().header.currentPassword;

  dispatch(changePassword(currentPassword, newPass))
    .then(() => {
      dispatch(
        Notifications.success({
          ...baseNotification,
          title: 'Password changed',
          message: 'Password changed successfully!',
        }),
      );
      dispatch(setCurrentPassword(''));
      dispatch(closeChangePasswordModal());
    })
    .catch(() => {
      dispatch(
        Notifications.error({
          ...baseNotification,
          title: 'Password change failed',
          message: 'Password could not be changed!',
        }),
      );
      dispatch(setCurrentPassword(''));
      dispatch(closeChangePasswordModal());
    });
};

export const changeUserInfo = (email, firstname, lastname) => dispatch => {
  dispatch(closeChangeUserInfoModal());
  dispatch(modifySelf(email, firstname, lastname))
    .then(() => {
      dispatch(
        Notifications.success({
          ...baseNotification,
          title: 'User profile modified',
          message: 'User profile modified successfully!',
        }),
      );
    })
    .catch(error => {
      dispatch(
        Notifications.error({
          ...baseNotification,
          title: 'Error',
          message: `Could not modify user profile. ERROR: ${error}`,
        }),
      );
    });
};