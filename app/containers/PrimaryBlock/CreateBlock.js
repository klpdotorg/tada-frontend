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
    const options = {
      name,
      parent: districtId,
      boundary_type: 1,
      boundary_category: 10,
    };
    dispatch(saveNewBlock(options));
  },
});

const CreateBlock = connect(mapStateToProps, mapDispatchToProps)(CreateBoundary);

export { CreateBlock };
