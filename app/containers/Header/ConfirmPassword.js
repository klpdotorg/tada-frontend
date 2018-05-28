import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import {
  closeConfirmPasswordModal,
  enableConfirmPasswordForm,
  disableConfirmPasswordForm,
  confirmCurrentPwd,
} from '../../actions';

import { Modal } from '../../components/Modal';

const { Input } = FRC;

class ConfirmPasswordScreen extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.confirmCurrentPwd(myform.password);
  }

  render() {
    return (
      <Modal
        title="Current Password"
        contentLabel="Current Password"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.closeConfirmPasswordModal}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
        submitBtnLabel="Continue"
        cancelBtnLabel="Cancel"
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableConfirmPasswordForm}
          onInvalid={this.props.disableConfirmPasswordForm}
          ref={(ref) => {
            return (this.myform = ref);
          }}
        >
          <Input
            name="password"
            id="password"
            help="Please enter your current password and press continue"
            type="password"
            label="Password"
            required
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

ConfirmPasswordScreen.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  closeConfirmPasswordModal: PropTypes.func,
  confirmCurrentPwd: PropTypes.func,
  enableConfirmPasswordForm: PropTypes.func,
  disableConfirmPasswordForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.changeConfirmModal,
    canSubmit: state.header.enableConfirmPasswordForm,
  };
};

const ConfirmPassword = connect(mapStateToProps, {
  closeConfirmPasswordModal,
  enableConfirmPasswordForm,
  disableConfirmPasswordForm,
  confirmCurrentPwd,
})(ConfirmPasswordScreen);

export { ConfirmPassword };
