import {
  SHOW_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL,
  ENABLE_SUBMIT_FORM,
  DISABLE_SUBMIT_FORM,
  SHOW_BOUNDARY_LOADING,
  CLOSE_BOUNDARY_LOADING,
  SHOW_INSTITUTION_LOADING_IN_MA,
  CLOSE_INSTITUTION_LOADING_IN_MA,
  SHOW_CLASSES_LOADING_IN_MA,
  CLOSE_CLASSES_LOADING_IN_MA,
} from '../actions/types';

const INITIAL_STATE = {
  singleSelectMode: false,
  selectedBoundary: '',
  confirmModal: false,
  loadingBoundary: false,
  blockConfirmModal: false,
  enableSubmitForm: false,
  loadingInstitutionInMA: false,
  loadingStudentgroupInMA: false,
};

const AppState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SINGLE_SELECT_MODE':
      return {
        ...state,
        singleSelectMode: true,
      };
    case 'BOUNDARY_SELECTED':
      return {
        ...state,
        selectedBoundary: action.boundary,
      };
    case SHOW_CONFIRM_MODAL:
      return {
        ...state,
        confirmModal: true,
      };
    case CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        confirmModal: false,
      };
    case SHOW_BOUNDARY_LOADING:
      return {
        ...state,
        loadingBoundary: true,
      };
    case CLOSE_BOUNDARY_LOADING:
      return {
        ...state,
        loadingBoundary: false,
      };
    case ENABLE_SUBMIT_FORM:
      return {
        ...state,
        enableSubmitForm: true,
      };
    case DISABLE_SUBMIT_FORM:
      return {
        ...state,
        enableSubmitForm: false,
      };
    case SHOW_INSTITUTION_LOADING_IN_MA:
      return {
        ...state,
        loadingInstitutionInMA: true,
      };
    case CLOSE_INSTITUTION_LOADING_IN_MA:
      return {
        ...state,
        loadingInstitutionInMA: false,
      };
    case SHOW_CLASSES_LOADING_IN_MA:
      return {
        ...state,
        loadingStudentgroupInMa: true,
      };
    case CLOSE_CLASSES_LOADING_IN_MA:
      return {
        ...state,
        loadingStudentgroupInMa: false,
      };
    default:
      return state;
  }
};

export { AppState };
