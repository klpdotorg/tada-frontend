import { connect } from 'react-redux';
import { saveNewCircle, closeCreateCircleModal } from '../../actions';

import CreateBoundary from '../../components/Modals/CreateBoundary';

const mapStateToProps = (state) => {
  return {
    placeHolder: 'Circle Name',
    title: 'Create New Circle',
    isOpen: state.modal.createCircle,
  };
};

const CreateCircle = connect(mapStateToProps, {
  onCloseModal: closeCreateCircleModal,
  save: saveNewCircle,
})(CreateBoundary);

export { CreateCircle };
