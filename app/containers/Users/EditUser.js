import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import get from 'lodash.get';

import { Modal } from '../../components/Modal';
import { roles } from '../../Data';
import { saveUser, enableSubmitForm, disableSubmitForm, toggleEditUserModal } from '../../actions';

const { Input, Select } = FRC;

class EditUserView extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const user = {
      id: this.props.id,
      first_name: myform.firstName,
      last_name: myform.lastName,
      mobile_no: myform.mobileno,
      email: myform.email,
      groups: myform.role,
    };

    this.props.save(user);
  }

  render() {
    const { first_name, last_name, email, mobile_no, groups, isOpen, canSubmit } = this.props;
    console.log(groups);
    return (
      <Modal
        title="Edit User"
        contentLabel="Edit User"
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
            name="firstName"
            id="firstName"
            value={first_name}
            label="First Name"
            type="text"
            required
            validations="minLength:1"
          />
          <Input
            name="lastName"
            id="lastName"
            value={last_name}
            label="Last Name"
            type="text"
            validations="minLength:1"
            required
          />
          <Input
            name="mobileno"
            id="mobileno"
            value={mobile_no}
            label="Mobile No."
            type="number"
            validations={{
              myCustomIsFiveValidation: (values, value) => {
                return value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
                  ? true
                  : '';
              },
            }}
            required
          />
          <Input
            name="email"
            id="email"
            value={email}
            label="Email"
            validations="isEmail"
            type="email"
            required
          />
          <Select multiple name="role" label="Role" options={roles} value={groups} required />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditUserView.propTypes = {
  id: PropTypes.any,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  mobile_no: PropTypes.string,
  groups: PropTypes.array,
  email: PropTypes.string,
  canSubmit: PropTypes.bool,
  isOpen: PropTypes.bool,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  save: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { editUser, users } = state.users;
  const { first_name, last_name, email, mobile_no, groups } = get(users, editUser, {});

  return {
    id: editUser,
    isOpen: state.modal.editUser,
    canSubmit: state.appstate.enableSubmitForm,
    first_name,
    last_name,
    email,
    mobile_no,
    groups,
  };
};

const EditUser = connect(mapStateToProps, {
  save: saveUser,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleEditUserModal,
})(EditUserView);

export { EditUser };
