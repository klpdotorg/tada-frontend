import { connect } from 'react-redux';
import { saveNewBlock, openNode } from '../../actions';

import { CreateBoundary } from '../../components/Modals';

const mapStateToProps = (state) => {
  return {
    placeHolder: 'Block Name',
    title: 'Create New Block',
    isOpen: state.modal.createBlock,
    error: state.boundaries.createError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createBlock',
      });
    },
    save: (name, districtId, parentNodeId) => {
      dispatch(openNode(parentNodeId));
      dispatch(saveNewBlock(name, districtId));
    },
  };
};

const CreateBlock = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateBlock };
