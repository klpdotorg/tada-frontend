import { connect } from 'react-redux';
import { saveNewCluster } from '../../actions';

import CreateBoundary from '../../components/Modals/CreateBoundary';

const mapStateToProps = state => ({
  placeHolder: 'Cluster Name',
  title: 'Create New Cluster',
  isOpen: state.modal.createCluster,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCluster',
    });
  },
  save: (name, blockId) => {
    dispatch(saveNewCluster(name, blockId));
  },
});

const CreateCluster = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateCluster };
