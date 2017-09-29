import { TOGGLE_DISTRICT_CONFIRM_MODAL, ENABLE_SUBMIT_FORM, DISABLE_SUBMIT_FORM } from './types';

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

export const toggleDistrictConfirmModal = {
  type: TOGGLE_DISTRICT_CONFIRM_MODAL,
};

export const enableSubmitForm = () => ({
  type: ENABLE_SUBMIT_FORM,
});

export const disableSubmitForm = () => ({
  type: DISABLE_SUBMIT_FORM,
});
