import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import { toggleConfirmPasswordModal } from '../../actions';

import Modal from '../../components/Modal';
import FRC from 'formsy-react-components';

class ConfirmPasswordScreen extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    var myform = this.myform.getModel();

    this.props.handleSubmit(myform.password);
  }

  render() {
    return (
      <Modal
        title="Current Password"
        contentLabel="Current Password"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
        submitBtnLabel="Continue"
        cancelBtnLabel="Cancel"
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitButton}
          onInvalid={this.props.disableSubmitButton}
          disabled={this.state.disabled}
          ref={ref => (this.myform = ref)}
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
  toggleConfirmPasswordModal: PropTypes.func,
  changePassword: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.header.changeConfirmModal,
});

const ConfirmPasswordScreen = connect(mapStateToProps, {
  toggleConfirmPasswordModal,
  enableConfirmPasswordForm,
  disableConfirmPasswordForm,
  confirmPassword,
})(ConfirmPasswordScreen);

export { ConfirmPasswordScreen };
