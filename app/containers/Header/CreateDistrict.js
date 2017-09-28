import { connect } from 'react-redux';
import CreateBoundary from '../../components/Modals/CreateBoundary';
import { saveNewDistrict } from '../../actions';

const mapStateToProps = state => ({
  isOpen: state.modal.createDistrict,
  placeHolder: 'District Name',
  title: 'Create New District',
});

const mapDispatchToProps = dispatch => ({
  onCloseModal() {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createDistrict',
    });
  },
  save: name => {
    dispatch(saveNewDistrict(name));
  },
});

const CreateDistrict = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateDistrict };
