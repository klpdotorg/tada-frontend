import { connect } from 'react-redux';
import { CreateBoundary } from '../../components/Modals';
import { saveNewDistrict } from '../../actions';

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createDistrict,
    placeHolder: 'District Name',
    title: 'Create New District',
    error: state.boundaries.createError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal() {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createDistrict',
      });
    },
    save: (name) => {
      dispatch(saveNewDistrict(name));
    },
  };
};

const CreateDistrict = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateDistrict };
