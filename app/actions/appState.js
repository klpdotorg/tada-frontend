import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';

import {
  ENABLE_SUBMIT_FORM,
  DISABLE_SUBMIT_FORM,
  SHOW_CONFIRM_MODAL,
  SHOW_BOUNDARY_LOADING,
  CLOSE_BOUNDARY_LOADING,
  SHOW_INSTITUTION_LOADING_IN_MA,
  CLOSE_INSTITUTION_LOADING_IN_MA,
  SHOW_CLASSES_LOADING_IN_MA,
  CLOSE_CLASSES_LOADING_IN_MA,
  TOGGLE_SUBMIT_LOADING,
  TOGGLE_SPINNER,
} from './types';

import { showSuccessMessage } from './notifications';

export const infoNotification = (title, body) => {
  return (dispatch) => {
    dispatch(Notifications.info(showSuccessMessage(title, body)));
  };
};

export const toggleSpinner = (value) => {
  return {
    type: TOGGLE_SPINNER,
    value,
  };
};

export const redirect = (url) => {
  return (dispatch) => {
    dispatch(push(url));
  };
};

export const enableNavTreeSingleSelect = (singleSelMode) => {
  return {
    type: 'SINGLE_SELECT_MODE',
    value: singleSelMode,
  };
};

export const permissionsPageActive = (isActive) => {
  return {
    type: 'PERMISSIONS_ACTIVE',
    value: isActive,
  };
};

export const boundaryClicked = (bound) => {
  return {
    type: 'BOUNDARY_SELECTED',
    boundary: bound,
  };
};

export const showConfirmModal = () => {
  return {
    type: SHOW_CONFIRM_MODAL,
  };
};

export const showBoundaryLoading = () => {
  return {
    type: SHOW_BOUNDARY_LOADING,
  };
};

export const closeBoundaryLoading = () => {
  return {
    type: CLOSE_BOUNDARY_LOADING,
  };
};

export const enableSubmitForm = () => {
  return {
    type: ENABLE_SUBMIT_FORM,
  };
};

export const disableSubmitForm = () => {
  return {
    type: DISABLE_SUBMIT_FORM,
  };
};

export const showInstitutionLoadingInMa = () => {
  return {
    type: SHOW_INSTITUTION_LOADING_IN_MA,
  };
};

export const closeInstitutionLoadingInMa = () => {
  return {
    type: CLOSE_INSTITUTION_LOADING_IN_MA,
  };
};

export const showClassesLoadingInMA = () => {
  return {
    type: SHOW_CLASSES_LOADING_IN_MA,
  };
};

export const closeClassesLoadingInMA = () => {
  return {
    type: CLOSE_CLASSES_LOADING_IN_MA,
  };
};

export const toggleSubmitLoading = () => {
  return {
    type: TOGGLE_SUBMIT_LOADING,
  };
};
