import {
  ENABLE_SUBMIT_FORM,
  DISABLE_SUBMIT_FORM,
  TOGGLE_BLOCK_CONFIRM_MODAL,
  SHOW_DISTRICT_CONFIRM_MODAL,
  CLOSE_DISTRICT_CONFIRM_MODAL,
} from './types';

export const enableNavTreeSingleSelect = singleSelMode => ({
  type: 'SINGLE_SELECT_MODE',
  value: singleSelMode,
});

export const permissionsPageActive = isActive => ({
  type: 'PERMISSIONS_ACTIVE',
  value: isActive,
});

export const boundaryClicked = bound => ({
  type: 'BOUNDARY_SELECTED',
  boundary: bound,
});

export const showDistrictConfirmModal = () => ({
  type: SHOW_DISTRICT_CONFIRM_MODAL,
});

export const closeDistrictConfirmModal = () => ({
  type: CLOSE_DISTRICT_CONFIRM_MODAL,
});

export const toggleBlockConfirmModal = {
  type: TOGGLE_BLOCK_CONFIRM_MODAL,
};

export const enableSubmitForm = () => ({
  type: ENABLE_SUBMIT_FORM,
});

export const disableSubmitForm = () => ({
  type: DISABLE_SUBMIT_FORM,
});
