import React from 'react';
import PropTypes from 'prop-types';
import Modal from './ModalTemplate';

const DeleteProgram = ({ isOpen, canSubmit = true, onCloseModal, deleteProgram }) =>
  <Modal
    title="Delete Program"
    contentLabel="Delete Program"
    isOpen={isOpen}
    canSubmit={canSubmit}
    onCloseModal={onCloseModal}
    submitForm={deleteProgram}
    cancelBtnLabel="No"
    submitBtnLabel="Yes"
  >
    <form id="deleteProgram">
      <div className="form-group">
        <label>Do you really want to delete this program?</label>
      </div>
    </form>
  </Modal>;

DeleteProgram.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  onCloseModal: PropTypes.func,
  deleteProgram: PropTypes.func,
};

export default DeleteProgram;
