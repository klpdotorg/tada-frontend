import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { toggleModal, enableSubmitForm, disableSubmitForm, changeUserInfo } from '../../actions';

import { Modal } from '../../components/Modal';

const { Input } = FRC;

class ChangeUserInfoScreen extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const newUser = {
      email: myform.email,
      last_name: myform.lastName,
      first_name: myform.firstName,
      mobile_no: myform.phone,
    };

    this.props.changeUserInfo(newUser);
  }

  render() {
    const { email, firstName, lastName, mobileNo } = this.props;

    return (
      <Modal
        title="Change Profile"
        contentLabel="Change Profile"
        isOpen={this.props.isOpen}
        onCloseModal={() => {
          this.props.toggleModal('changeUserModal');
        }}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel.."
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
            name="email"
            id="email"
            type="text"
            label="E-mail"
            validations="isEmail,minLength:1"
            value={email}
          />
          <Input
            name="firstName"
            id="firstName"
            type="text"
            label="First Name"
            validations="isAlpha"
            value={firstName}
          />
          <Input
            name="lastName"
            id="lastName"
            type="text"
            label="Last Name"
            validations="isAlpha"
            value={lastName}
          />
          <Input
            name="phone"
            id="phone"
            type="text"
            label="Mobile"
            validations="isNumeric"
            value={mobileNo}
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

ChangeUserInfoScreen.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  toggleModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  changeUserInfo: PropTypes.func,
  mobileNo: PropTypes.number,
};

const mapStateToProps = (state) => {
  const { email, firstName, lastName, mobileNo } = state.profile;
  return {
    isOpen: state.modal.changeUserModal,
    email,
    firstName,
    lastName,
    mobileNo: Number(mobileNo),
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const ChangeUserInfo = connect(mapStateToProps, {
  toggleModal,
  enableSubmitForm,
  disableSubmitForm,
  changeUserInfo,
})(ChangeUserInfoScreen);

export { ChangeUserInfo };
