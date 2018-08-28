import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import isEmpty from 'lodash.isempty';

import { Modal } from '../../components/Modal';
import {
  enableSubmitForm,
  disableSubmitForm,
  submitForgotPassword,
  changeFPPassword,
  toggleModal,
} from '../../actions';

const { Input } = FRC;

class EnterPasswordView extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    this.props.changePassword(myform.password1);
    this.props.save();
  }

  render() {
    const { isOpen, canSubmit, error } = this.props;

    return (
      <Modal
        title="Enter OTP"
        contentLabel="Enter OTP"
        isOpen={isOpen}
        onCloseModal={() => {
          this.props.closeConfirmModal('enterPassword');
        }}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        autoComplete="off"
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          {!isEmpty(error) ? (
            <div className="alert alert-danger">
              {Object.keys(error).map((key) => {
                const value = error[key];
                return (
                  <p key={key}>
                    <strong>{key}:</strong> {value[0]}
                  </p>
                );
              })}
            </div>
          ) : (
            <span />
          )}
          <Input
            name="password1"
            value=""
            label="Password"
            type="password"
            validations="minLength:8"
            validationError="Your password must be at least 8 characters long."
            placeholder="Choose a password"
          />
          <Input
            name="password2"
            value=""
            label="Confirm password"
            type="password"
            validations="equalsField:password1"
            validationErrors={{
              equalsField: 'Passwords must match.',
            }}
            placeholder="Retype password"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EnterPasswordView.propTypes = {
  canSubmit: PropTypes.bool,
  isOpen: PropTypes.bool,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  save: PropTypes.func,
  changePassword: PropTypes.func,
  error: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { password, otpError } = state.forgotPassword;

  return {
    isOpen: state.modal.enterPassword,
    canSubmit: state.appstate.enableSubmitForm,
    password,
    error: otpError,
  };
};

const EnterPassword = connect(mapStateToProps, {
  save: submitForgotPassword,
  enableSubmitForm,
  disableSubmitForm,
  changePassword: changeFPPassword,
  closeConfirmModal: toggleModal,
})(EnterPasswordView);

export { EnterPassword };
