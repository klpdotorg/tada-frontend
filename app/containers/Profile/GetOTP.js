import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';
import { resetPassword, enableSubmitForm, disableSubmitForm, toggleModal } from '../../actions';

const { Input } = FRC;

class GetOTPView extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.changeOTP(myform.otp);
  }

  render() {
    const { isOpen, canSubmit, otp } = this.props;

    return (
      <Modal
        title="Enter OTP"
        contentLabel="Enter OTP"
        isOpen={isOpen}
        onCloseModal={() => {
          this.props.toggleModal('changeOTP');
        }}
        canSubmit={canSubmit}
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
          <Input name="otp" id="otp" type="number" label="OTP" defaultValue={otp} />
        </Formsy.Form>
      </Modal>
    );
  }
}

GetOTPView.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  otp: PropTypes.number,
  toggleModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  changeOTP: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.changeOTP,
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const GetOTP = connect(mapStateToProps, {
  changeOTP: resetPassword,
  toggleModal,
  enableSubmitForm,
  disableSubmitForm,
})(GetOTPView);

export { GetOTP };
