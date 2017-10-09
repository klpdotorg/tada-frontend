import { connect } from 'react-redux';
import { saveNewBlock } from '../../actions';

import CreateBoundary from '../../components/Modals/CreateBoundary';

const mapStateToProps = state => ({
  placeHolder: 'Block Name',
  title: 'Create New Block',
  isOpen: state.modal.createBlock,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createBlock',
    });
  },
  save: (name, districtId) => {
    dispatch(saveNewBlock(name, districtId));
  },
});

const CreateBlock = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateBlock };
