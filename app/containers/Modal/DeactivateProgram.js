import { connect } from 'react-redux';

import { ConfirmModal } from '../../components/Modals';
import { closeConfirmModal } from '../../actions';

const mapStateToProps = (state) => {
  const {
    title,
    description,
    message,
    deactivateProgram,
    yesButtonTxt,
    noButtonTxt,
  } = state.confirm;

  return {
    title,
    description,
    message,
    isOpen: deactivateProgram,
    yesButtonTxt,
    noButtonTxt,
  };
};

const DeactivateProgram = connect(mapStateToProps, {
  onCloseModal: closeConfirmModal,
})(ConfirmModal);

export { DeactivateProgram };
