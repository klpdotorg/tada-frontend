import { TOGGLE_MODAL } from './types';

export const toggleCreatePreschoolModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createPreschool',
  };
};
