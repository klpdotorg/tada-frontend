import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { toggleModal, updatePassword, enableSubmitForm, disableSubmitForm } from '../../actions';

import { Modal } from '../../components/Modal';

const { Input } = FRC;

class ChangePasswordScreen extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.updatePassword({
      oldPassword: myform.old_password,
      newPassword: myform.password,
    });
  }

  render() {
    const { error } = this.props;
    return (
      <Modal
        title="Change Password"
        contentLabel="Change Password"
        isOpen={this.props.isOpen}
        onCloseModal={() => {
          this.props.closeModal('changePasswordModal');
        }}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          {error ? <div className="alert alert-danger">{error}</div> : <span />}
          <Input
            name="old_password"
            id="old_password"
            type="password"
            label="Old Password"
            required
          />
          <Input
            name="password"
            id="password"
            type="password"
            label="Password"
            required
            validations="minLength:8"
          />
          <Input
            name="retypePassword"
            id="retypePassword"
            type="password"
            label="Re-type Password"
            required
            validations={{
              doPasswordsMatch: (values, value) => {
                return values.password === value ? true : 'Passwords do not match';
              },
            }}
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

ChangePasswordScreen.propTypes = {
  error: PropTypes.string,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  closeModal: PropTypes.func,
  updatePassword: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.changePasswordModal,
    canSubmit: state.appstate.enableSubmitForm,
    error: state.changePassword.error,
  };
};

const ChangePassword = connect(mapStateToProps, {
  closeModal: toggleModal,
  updatePassword,
  enableSubmitForm,
  disableSubmitForm,
})(ChangePasswordScreen);

export { ChangePassword };
