import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import isEmpty from 'lodash.isempty';

import { Modal } from '../../components/Modal';
import { roles } from '../../Data';
import {
  saveNewUser,
  enableSubmitForm,
  disableSubmitForm,
  toggleAddUserModal,
} from '../../actions';

const { Input, Select } = FRC;

class AddUserView extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  getStates() {
    return this.props.states.map((state) => {
      return {
        value: state.state_code,
        label: state.name,
      };
    });
  }

  submitForm() {
    const myform = this.myform.getModel();
    const user = {
      first_name: myform.firstName,
      last_name: myform.lastName,
      mobile_no: myform.mobileno,
      email: myform.email,
      password: myform.password,
      groups: [myform.role],
      userboundaries: myform.stateCodes,
    };

    this.props.save(user);
  }

  render() {
    const { isOpen, canSubmit, error } = this.props;

    return (
      <Modal
        title="Create User"
        contentLabel="Create User"
        isOpen={isOpen}
        onCloseModal={this.props.closeConfirmModal}
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
            name="firstName"
            id="firstName"
            value=""
            label="First Name"
            type="text"
            required
            validations="minLength:1"
          />
          <Input
            name="lastName"
            id="lastName"
            value=""
            label="Last Name"
            type="text"
            validations="minLength:1"
            required
          />
          <Input
            name="mobileno"
            id="mobileno"
            value=""
            label="Mobile No."
            type="tel"
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
            value=""
            label="Email"
            type="email"
            validations="isEmail"
            required
          />
          <Input
            name="password"
            id="password"
            value=""
            label="Password"
            type="password"
            required
            validations="minLength:5"
          />
          <Select name="role" label="Role" options={roles} value="tada_deo" required />
          <Select
            multiple
            name="stateCodes"
            label="States"
            value={['ka']}
            options={this.getStates()}
            required
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

AddUserView.propTypes = {
  canSubmit: PropTypes.bool,
  isOpen: PropTypes.bool,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  save: PropTypes.func,
  error: PropTypes.object,
  states: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createUser,
    canSubmit: state.appstate.enableSubmitForm,
    error: state.users.error,
    states: state.states.states,
  };
};

const AddUser = connect(mapStateToProps, {
  save: saveNewUser,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleAddUserModal,
})(AddUserView);

export { AddUser };
