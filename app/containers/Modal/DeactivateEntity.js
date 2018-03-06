import { connect } from 'react-redux';

import { ConfirmModal } from '../../components/Modals';
import { closeConfirmModal } from '../../actions';

const mapStateToProps = (state) => {
  const {
    title,
    description,
    uniqueId,
    message,
    deactivateEntity,
    yesButtonTxt,
    noButtonTxt,
  } = state.confirm;

  return {
    title,
    description,
    id: uniqueId,
    message,
    isOpen: deactivateEntity,
    yesButtonTxt,
    noButtonTxt,
  };
};

const DeactivateEntity = connect(mapStateToProps, {
  onCloseModal: closeConfirmModal,
})(ConfirmModal);

export { DeactivateEntity };
