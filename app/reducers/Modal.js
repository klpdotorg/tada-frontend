const INITIAL_STATE = {
  createDistrict: false,
  createBlock: false,
  createCluster: false,
  createProject: false,
  createCircle: false,
  createInstitution: false,
  createClass: false,
};

const Modal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        [action.modal]: !state[action.modal],
      };
    default:
      return state;
  }
};

export { Modal };
