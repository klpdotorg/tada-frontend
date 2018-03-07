import { OPEN_CONFIRM_MODAL, CLOSE_CONFIRM_MODAL } from './types';

export const openDeleteProgramModal = (name) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      isOpen: true,
      message: `Are you sure you want to delete this <b> ${name} </b>`,
      title: 'Delete Program?',
      description: 'Delete Program?',
      yesButtonTxt: 'Yes',
      noButtonTxt: 'No',
    },
  };
};

export const openDeleteBoundaryModal = (name) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      isOpen: true,
      message: `Are you sure you want to delete this <b> ${name} </b>`,
      title: 'Delete Boundary?',
      description: 'Delete Boundary?',
      yesButtonTxt: 'Yes',
      noButtonTxt: 'no',
    },
  };
};

export const openDeactivateProgramModal = (name, uniqueId) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      deactivateEntity: true,
      uniqueId,
      message: `Are you sure you want to deactivate this ${name}`,
      title: 'Deactivate Program?',
      description: 'Deactivate Program?',
      yesButtonTxt: 'Yes',
      noButtonTxt: 'no',
    },
  };
};

export const openDeactivateAssessmentModal = (name, uniqueId) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      deactivateEntity: true,
      uniqueId,
      message: `Are you sure you want to deactivate this ${name}`,
      title: 'Deactivate Assessment?',
      description: 'Deactivate Assessment?',
      yesButtonTxt: 'Yes',
      noButtonTxt: 'No',
    },
  };
};

export const closeConfirmModal = () => {
  return {
    type: CLOSE_CONFIRM_MODAL,
  };
};
