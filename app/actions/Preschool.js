import { TOGGLE_MODAL } from './types';
import { resetCreateBoundaryError } from '.';

export const toggleCreatePreschoolModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createPreschool',
    });
    dispatch(resetCreateBoundaryError());
  };
};
