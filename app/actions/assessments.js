// import { SERVER_API_BASE as serverApiBase } from 'config';

import { TOGGLE_MODAL } from './types';

export const openAddAssessmentModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'addAssessment',
    });
  };
};
