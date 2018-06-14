import {
  OPEN_CURRENT_PASSWORD_MODAL,
  OPEN_CHANGE_PASSWORD_MODAL,
  OPEN_CHANGE_USER_MODAL,
  CLOSE_CURRENT_PASSWORD_MODAL,
  CLOSE_CHANGE_PASSWORD_MODAL,
  CLOSE_CHANGE_USER_MODAL,
  SET_CURRENT_PASSWORD,
  ENABLE_CONFIRM_PASSWORD_FORM,
  ENABLE_CHANGE_PASSWORD_FORM,
  ENABLE_CHANGE_USER_INFO_FORM,
  DISABLE_CHANGE_PASSWORD_FORM,
  DISABLE_CONFIRM_PASSWORD_FORM,
  DISABLE_CHANGE_USER_INFO_FORM,
  SUGGESTION_RESULTS,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  currentPassword: '',
  enableConfirmPasswordForm: false,
  enableChangePasswordForm: false,
  enableChangeUserInfoForm: false,
  suggestionResults: [],
};

const Header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_CURRENT_PASSWORD_MODAL:
      return {
        ...state,
        currentPasswordModal: true,
      };
    case OPEN_CHANGE_USER_MODAL:
      return {
        ...state,
        changeUserModal: true,
      };
    case OPEN_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        changePasswordModal: true,
      };
    case CLOSE_CURRENT_PASSWORD_MODAL:
      return {
        ...state,
        currentPasswordModal: false,
      };
    case CLOSE_CHANGE_USER_MODAL:
      return {
        ...state,
        changeUserModal: false,
      };
    case CLOSE_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        changePasswordModal: false,
      };
    case SET_CURRENT_PASSWORD:
      return {
        ...state,
        setCurrentPassword: action.value,
      };
    case ENABLE_CONFIRM_PASSWORD_FORM:
      return {
        ...state,
        enableConfirmPasswordForm: true,
      };
    case ENABLE_CHANGE_PASSWORD_FORM:
      return {
        ...state,
        enableChangePasswordForm: true,
      };
    case ENABLE_CHANGE_USER_INFO_FORM:
      return {
        ...state,
        enableChangeUserInfoForm: true,
      };
    case DISABLE_CONFIRM_PASSWORD_FORM:
      return {
        ...state,
        enableConfirmPasswordForm: false,
      };
    case DISABLE_CHANGE_PASSWORD_FORM:
      return {
        ...state,
        enableChangePasswordForm: false,
      };
    case DISABLE_CHANGE_USER_INFO_FORM:
      return {
        ...state,
        enableChangeUserInfoForm: false,
      };
    case SUGGESTION_RESULTS:
      return {
        ...state,
        suggestionResults: action.results,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Header };
