import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';
import {
  enableSubmitForm,
  disableSubmitForm,
  goToEnterPassword,
  changeFPOTP,
  toggleModal,
} from '../../actions';

const { Input } = FRC;

class EnterOTPView extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    this.props.changeOTP(myform.otp);
    this.props.toggleModal('enterOTP');
    this.props.toggleModal('enterPassword');
  }

  render() {
    const { isOpen, canSubmit } = this.props;

    return (
      <Modal
        title="Enter OTP"
        contentLabel="Enter OTP"
        isOpen={isOpen}
        onCloseModal={() => {
          this.props.toggleModal('enterOTP');
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
          <Input
            name="otp"
            id="otp"
            value=""
            label="Enter OTP"
            type="text"
            required
            validations="minLength:1"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EnterOTPView.propTypes = {
  canSubmit: PropTypes.bool,
  isOpen: PropTypes.bool,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  toggleModal: PropTypes.func,
  changeOTP: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { otp } = state.forgotPassword;

  return {
    isOpen: state.modal.enterOTP,
    canSubmit: state.appstate.enableSubmitForm,
    otp,
  };
};

const EnterOTP = connect(mapStateToProps, {
  save: goToEnterPassword,
  enableSubmitForm,
  disableSubmitForm,
  changeOTP: changeFPOTP,
  toggleModal,
})(EnterOTPView);

export { EnterOTP };
