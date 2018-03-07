import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { modalStyle as customStyles } from '../../styles';

const ModalTemplate = (props) => {
  const {
    contentLabel,
    isOpen,
    onCloseModal,
    title,
    canSubmit,
    submitForm,
    cancelBtnLabel,
    submitBtnLabel,
    hideCancelBtn,
    children,
  } = props;

  return (
    <Modal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <div className="" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={onCloseModal} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="title">
              {title}
            </h4>
          </div>
          <div className="modal-body" style={{ overflowY: 'auto', maxHeight: '28rem' }}>
            {children}
          </div>
          <div className="modal-footer">
            {hideCancelBtn ? (
              ''
            ) : (
              <button type="button" className="btn btn-primary" onClick={onCloseModal}>
                {!cancelBtnLabel ? 'Discard' : cancelBtnLabel}
              </button>
            )}
            <button
              type="button"
              disabled={!canSubmit}
              className="btn btn-primary"
              onClick={submitForm}
            >
              {!submitBtnLabel ? 'Save' : submitBtnLabel}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalTemplate.propTypes = {
  contentLabel: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.any,
  hideCancelBtn: PropTypes.bool,
  cancelBtnLabel: PropTypes.string,
  canSubmit: PropTypes.bool,
  submitBtnLabel: PropTypes.string,
  submitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export { ModalTemplate };
