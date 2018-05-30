import { connect } from 'react-redux';

import { ConfirmModal } from '../../components/Modals';
import { closeConfirmModal } from '../../actions';

const mapStateToProps = (state) => {
  const {
    title,
    description,
    message,
    isOpen,
    yesButtonTxt,
    noButtonTxt,
    uniqueId,
  } = state.confirm;

  return {
    title,
    description,
    message,
    isOpen,
    yesButtonTxt,
    noButtonTxt,
    id: uniqueId,
  };
};

const Confirm = connect(mapStateToProps, { onCloseModal: closeConfirmModal })(ConfirmModal);

export { Confirm };
