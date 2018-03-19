import { OPEN_CONFIRM_MODAL, CLOSE_CONFIRM_MODAL } from './types';

export const openDeleteProgramModal = (name, uniqueId) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      isOpen: true,
      uniqueId,
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
      isOpen: true,
      uniqueId,
      message: `Are you sure you want to deactivate this ${name}`,
      title: 'Deactivate Program?',
      description: 'Deactivate Program?',
      yesButtonTxt: 'Yes',
      noButtonTxt: 'no',
    },
  };
};

export const openDeactivateAssessmentsModal = (uniqueId) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      isOpen: true,
      uniqueId,
      message: 'Are you sure you want to deactivate these entities?',
      title: 'Deactivate Assessment?',
      description: 'Deactivate Assessment?',
      yesButtonTxt: 'Yes',
      noButtonTxt: 'No',
    },
  };
};

export const openDeleteAssessmentModal = (name, uniqueId) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    value: {
      isOpen: true,
      message: `Are you sure you want to delete this "${name}": `,
      uniqueId,
      title: 'Delete Assessment?',
      description: 'Delete Assessment?',
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
