import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { modalStyle as customStyles } from '../../styles.js';

const Modal = (props) => {
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
    <ReactModal
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
    </ReactModal>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  contentLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  submitBtnLabel: PropTypes.string,
  hideCancelBtn: PropTypes.bool,
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  canSubmit: PropTypes.bool,
  submitForm: PropTypes.func,
  children: PropTypes.element,
};

export { Modal };
