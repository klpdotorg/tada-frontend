import React from 'react';

import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';

const { Input } = FRC;

const GetOTP = () => {
  return (
    <Modal
      title="Enter OTP"
      contentLabel="Enter OTP"
      isOpen={this.props.isOpen}
      onCloseModal={this.props.closeChangeUserInfoModal}
      canSubmit={this.props.canSubmit}
      submitForm={this.submitForm}
      cancelBtnLabel="Cancel.."
    >
      <Formsy.Form
        onValidSubmit={this.submitForm}
        onValid={this.props.enableChangeUserInfoForm}
        onInvalid={this.props.disableChangeUserInfoForm}
        ref={(ref) => {
          this.myform = ref;
        }}
      >
        <Input
          name="email"
          id="email"
          type="text"
          label="E-mail"
          validations="isEmail,minLength:1"
          defaultValue={this.props.email}
        />
      </Formsy.Form>
    </Modal>
  );
};

export { GetOTP };
