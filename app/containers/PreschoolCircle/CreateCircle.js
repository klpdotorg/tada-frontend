import { connect } from 'react-redux';
import { saveNewCircle } from '../../actions';

import CreateBoundary from '../../components/Modals/CreateBoundary';

const mapStateToProps = state => ({
  placeHolder: 'Circle Name',
  title: 'Create New Circle',
  isOpen: state.modal.createCircle,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCircle',
    });
  },
  save: (name, projectId) => {
    const options = {
      name,
      parent: projectId,
      boundary_type: 2,
      boundary_category: 14,
    };
    dispatch(saveNewCircle(options));
  },
});

const CreateCircle = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateCircle };
