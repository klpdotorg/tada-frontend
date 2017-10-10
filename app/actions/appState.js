import {
  ENABLE_SUBMIT_FORM,
  DISABLE_SUBMIT_FORM,
  SHOW_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL,
  SHOW_BOUNDARY_LOADING,
  CLOSE_BOUNDARY_LOADING,
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

export const showConfirmModal = () => ({
  type: SHOW_CONFIRM_MODAL,
});

export const closeConfirmModal = () => ({
  type: CLOSE_CONFIRM_MODAL,
});

export const showBoundaryLoading = () => ({
  type: SHOW_BOUNDARY_LOADING,
});

export const closeBoundaryLoading = () => ({
  type: CLOSE_BOUNDARY_LOADING,
});

export const enableSubmitForm = () => ({
  type: ENABLE_SUBMIT_FORM,
});

export const disableSubmitForm = () => ({
  type: DISABLE_SUBMIT_FORM,
});
