import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import {
  closeChangePasswordModal,
  changePwd,
  enableChangePasswordForm,
  disableChangePasswordForm,
} from '../../actions';

import { Modal } from '../../components/Modal';

const { Input } = FRC;

class ChangePasswordScreen extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.changePwd(myform.password);
  }

  render() {
    return (
      <Modal
        title="Change Password"
        contentLabel="Change Password"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.closeChangePasswordModal}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableChangePasswordForm}
          onInvalid={this.props.disableChangePasswordForm}
          ref={ref => {
            this.myform = ref;
          }}
        >
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
              doPasswordsMatch: (values, value) =>
                values.password === value ? true : 'Passwords do not match',
            }}
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

ChangePasswordScreen.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  closeChangePasswordModal: PropTypes.func,
  changePwd: PropTypes.func,
  enableChangePasswordForm: PropTypes.func,
  disableChangePasswordForm: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.header.changePasswordModal,
  canSubmit: state.header.enableChangePasswordForm,
});

const ChangePassword = connect(mapStateToProps, {
  closeChangePasswordModal,
  changePwd,
  enableChangePasswordForm,
  disableChangePasswordForm,
})(ChangePasswordScreen);

export { ChangePassword };
