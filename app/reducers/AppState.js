import {
  TOGGLE_DISTRICT_CONFIRM_MODAL,
  ENABLE_SUBMIT_FORM,
  DISABLE_SUBMIT_FORM,
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
    case TOGGLE_DISTRICT_CONFIRM_MODAL:
      return {
        ...state,
        districtConfirmModal: !state.districtConfirmModal,
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
