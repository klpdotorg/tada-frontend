import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';
import {
  resetUserPassword,
  enableSubmitForm,
  disableSubmitForm,
  toggleResetUserPasswordModal,
} from '../../actions';

const { Input } = FRC;

class ResetUserPasswordView extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const user = {
      new_password: myform.password1,
    };

    this.props.save(user);
  }

  render() {
    const { isOpen, canSubmit } = this.props;

    return (
      <Modal
        title="Reset User Password"
        contentLabel="Reset User Password"
        isOpen={isOpen}
        onCloseModal={this.props.closeConfirmModal}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
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

ResetUserPasswordView.propTypes = {
  canSubmit: PropTypes.bool,
  isOpen: PropTypes.bool,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  save: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.resetUserPassword,
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const ResetUserPassword = connect(mapStateToProps, {
  save: resetUserPassword,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleResetUserPasswordModal,
})(ResetUserPasswordView);

export { ResetUserPassword };
