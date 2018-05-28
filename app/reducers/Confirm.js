import { OPEN_CONFIRM_MODAL, CLOSE_CONFIRM_MODAL } from '../actions/types';

const INITIAL_STATE = {
  isOpen: false,
  title: 'Confirm Modal',
  description: 'Confirm Modal',
  message: 'Are you sure you want delete this entity?',
  yesButtonTxt: 'Yes',
  noButtonTxt: 'No',
};

const Confirm = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_CONFIRM_MODAL:
      return {
        ...state,
        ...action.value,
      };
    case CLOSE_CONFIRM_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Confirm };
