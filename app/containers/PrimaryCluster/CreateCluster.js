import { connect } from 'react-redux';
import { saveNewCluster, openNode } from '../../actions';

import { CreateBoundary } from '../../components/Modals';

const mapStateToProps = (state) => {
  return {
    placeHolder: 'Cluster Name',
    title: 'Create New Cluster',
    isOpen: state.modal.createCluster,
    error: state.boundaries.createError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createCluster',
      });
    },
    save: (name, blockId, parentNodeId) => {
      dispatch(openNode(parentNodeId));
      dispatch(saveNewCluster(name, blockId));
    },
  };
};

const CreateCluster = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateCluster };
