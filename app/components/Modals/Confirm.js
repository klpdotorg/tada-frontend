import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';

const ConfirmModal = (props) => {
  const {
    isOpen,
    title,
    id,
    uniqueId,
    description,
    message,
    onCloseModal,
    onYes,
    yesButtonTxt,
    noButtonTxt,
  } = props;
  const openModal = isOpen && id === uniqueId;

  return (
    <Modal
      title={title}
      contentLabel={description}
      isOpen={openModal}
      onCloseModal={onCloseModal}
      canSubmit
      submitForm={onYes}
      cancelBtnLabel={noButtonTxt}
      submitBtnLabel={yesButtonTxt}
    >
      <p className="text-warning">{message}</p>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  id: PropTypes.number,
  uniqueId: PropTypes.number,
  description: PropTypes.string,
  message: PropTypes.any,
  onCloseModal: PropTypes.func,
  onYes: PropTypes.func,
  yesButtonTxt: PropTypes.string,
  noButtonTxt: PropTypes.string,
};

export { ConfirmModal };
