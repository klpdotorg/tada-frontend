import { RESET } from '../actions/types';

const INITIAL_STATE = {
  createDistrict: false,
  createBlock: false,
  createCluster: false,
  createProject: false,
  createCircle: false,
  createInstitution: false,
  createClass: false,
  createPreschool: false,
  editQuestion: false,
  currentPasswordModal: false,
  changePasswordModal: false,
  changeUserModal: false,
  changeOTP: false,
  createUser: false,
  resetUserpassword: false,
};

const Modal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        [action.modal]: !state[action.modal],
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Modal };
