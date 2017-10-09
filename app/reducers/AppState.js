import {
  SHOW_DISTRICT_CONFIRM_MODAL,
  CLOSE_DISTRICT_CONFIRM_MODAL,
  ENABLE_SUBMIT_FORM,
  DISABLE_SUBMIT_FORM,
  TOGGLE_BLOCK_CONFIRM_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  singleSelectMode: false,
  selectedBoundary: '',
  districtConfirmModal: false,
  enableSubmitForm: false,
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
    case SHOW_DISTRICT_CONFIRM_MODAL:
      return {
        ...state,
        districtConfirmModal: true,
      };
    case CLOSE_DISTRICT_CONFIRM_MODAL:
      return {
        ...state,
        districtConfirmModal: false,
      };
    case TOGGLE_BLOCK_CONFIRM_MODAL:
      return {
        ...state,
        blockConfirmModal: !state.blockConfirmModal,
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
    default:
      return state;
  }
};

export { AppState };
