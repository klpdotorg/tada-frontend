import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';

const ConfirmModal = (props) => {
  const {
    isOpen,
    title,
    description,
    message,
    onCloseModal,
    onYes,
    yesButtonTxt,
    noButtonTxt,
  } = props;

  return (
    <Modal
      title={title}
      contentLabel={description}
      isOpen={isOpen}
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
  description: PropTypes.string,
  message: PropTypes.any,
  onCloseModal: PropTypes.func,
  onYes: PropTypes.func,
  yesButtonTxt: PropTypes.string,
  noButtonTxt: PropTypes.string,
};

export { ConfirmModal };
