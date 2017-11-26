import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';
import { editTeacher, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input } = FRC;

class EditTeacherForm extends Component {
  getValue(value) {
    return value || '';
  }

  submitForm = () => {
    const teacher = this.myform.getModel();
    this.props.save(teacher);
  };

  render() {
    const { institutionId, teacher, isOpen, canSubmit } = this.props;
    const {
      first_name,
      last_name,
      middle_name,
      contact_no,
      qualification,
      total_work_experience_years,
      total_work_experience_months,
      subject,
      address,
      area,
      pincode,
    } = teacher;

    return (
      <Modal
        title="Edit Teacher"
        contentLabel="Edit Teacher"
        isOpen={isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            return (this.myform = ref);
          }}
        >
          <Input
            name="first_name"
            id="first_name"
            label="First Name"
            type="text"
            value={this.getValue(first_name)}
            required
            validations="minLength:1"
          />
          <Input
            name="middle_name"
            id="middle_name"
            label="Middle Name"
            type="text"
            value={this.getValue(middle_name)}
            validations="minLength:1"
          />
          <Input
            name="last_name"
            id="last_name"
            label="Last Name"
            type="text"
            value={this.getValue(last_name)}
            validations="minLength:1"
          />
          <Input
            name="contact_no"
            id="contact_no"
            label="Contact No"
            type="number"
            value={this.getValue(contact_no)}
            validations="minLength:1"
          />
          <Input
            name="qualification"
            id="qualification"
            label="Qualification"
            type="text"
            value={this.getValue(qualification)}
            validations="minLength:1"
          />
          <Input
            name="total_work_experience_years"
            id="total_work_experience_years"
            label="Total Work Experience Years"
            type="number"
            value={this.getValue(total_work_experience_years)}
            validations="minLength:1"
            required
          />
          <Input
            name="total_work_experience_months"
            id="total_work_experience_months"
            label="Total Work Experience Months"
            type="number"
            value={this.getValue(total_work_experience_months)}
            validations="minLength:1"
            required
          />
          <Input
            name="subject"
            id="subject"
            label="Subject"
            type="text"
            value={this.getValue(subject)}
            validations="minLength:1"
          />
          <Input
            name="institution"
            id="institutionId"
            label="School ID"
            type="text"
            value={this.getValue(institutionId)}
            validations="minLength:1"
          />
          <Input
            name="address"
            id="address"
            label="Address"
            type="text"
            value={this.getValue(address)}
            validations="minLength:1"
          />
          <Input
            name="area"
            id="area"
            label="Area"
            type="text"
            value={this.getValue(area)}
            validations="minLength:1"
          />
          <Input
            name="pincode"
            id="pincode"
            label="Pincode"
            type="text"
            value={this.getValue(pincode)}
            validations="minLength:1"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditTeacherForm.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  institutionId: PropTypes.number,
  teacher: PropTypes.object,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createInstitution,
    canSubmit: state.appstate.enableSubmitForm,
    teacher: get(state.teachers.teachers, state.teachers.editTeacherId, {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form) => {
      dispatch(editTeacher(form));
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
        modal: 'editTeacher',
      });
    },
  };
};

const EditTeacher = connect(mapStateToProps, mapDispatchToProps)(EditTeacherForm);

export { EditTeacher };
