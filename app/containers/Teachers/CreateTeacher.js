import React, { Component } from 'react';
import Formsy from 'formsy-react';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import { Modal } from '../../components/Modal';

import { saveNewTeacher, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input, Select } = FRC;

class CreateTeacherForm extends Component {
  submitForm = () => {
    this.props.createTeacher(this.myform.getModel());
  };

  render() {
    const gender = [
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Female',
        value: 'female',
      },
    ];

    return (
      <Modal
        title="Create Teacher"
        contentLabel="Create Teacher"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => { return (this.myform = ref); }}
        >
          <Input
            name="first_name"
            id="first_name"
            value=""
            label="First Name"
            type="text"
            required
            validations="minLength:1"
          />
          <Input
            name="middle_name"
            id="middle_name"
            value=""
            label="Middle Name"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="last_name"
            id="last_name"
            value=""
            label="Last Name"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="contact_no"
            id="contact_no"
            value=""
            label="Contact No"
            type="number"
            validations="minLength:1"
          />
          <Select name="gender" label="Gender" value="male" options={gender} />
          <Input
            name="qualification"
            id="qualification"
            value=""
            label="Qualification"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="total_work_experience_years"
            id="total_work_experience_years"
            value=""
            label="Total Work Experience Years"
            type="number"
            validations="minLength:1"
            required
          />
          <Input
            name="total_work_experience_months"
            id="total_work_experience_months"
            value=""
            label="Total Work Experience Months"
            type="number"
            validations="minLength:1"
            required
          />
          <Input
            name="subject"
            id="subject"
            value=""
            label="Subject"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="institution"
            id="institution"
            value=""
            label="School ID"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="address"
            id="address"
            value=""
            label="Address"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="area"
            id="area"
            value=""
            label="Area"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="pincode"
            id="pincode"
            value=""
            label="Pincode"
            type="text"
            validations="minLength:1"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateTeacherForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  onCloseModal: PropTypes.func,
  createTeacher: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createInstitution,
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form) => {
      dispatch(saveNewTeacher(form));
    },
    enableSubmitForm: () => {
      dispatch(enableSubmitForm());
    },
    disableSubmitForm: () => {
      dispatch(disableSubmitForm());
    },
    closeConfirmModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createTeacher',
      });
    },
  };
};

const CreateTeacher = (mapStateToProps, mapDispatchToProps)(CreateTeacherForm);

export { CreateTeacher };
