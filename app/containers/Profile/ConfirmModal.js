import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { toggleModal, enableSubmitForm, disableSubmitForm, confirmCurrentPwd } from '../../actions';

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
        onCloseModal={() => {
          this.props.toggleModal('changeConfirmModal');
        }}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
        submitBtnLabel="Continue"
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
  toggleModal: PropTypes.func,
  confirmCurrentPwd: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.changeConfirmModal,
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const ConfirmPassword = connect(mapStateToProps, {
  toggleModal,
  enableSubmitForm,
  disableSubmitForm,
  confirmCurrentPwd,
})(ConfirmPasswordScreen);

export { ConfirmPassword };
