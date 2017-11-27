import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';
import { getStaffTypes } from './utils';
import { editTeacher, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input, Select } = FRC;

class EditTeacherForm extends Component {
  getValue(value) {
    return value || '';
  }

  submitForm = () => {
    const myform = this.myform.getModel();
    const teacher = {
      first_name: myform.firstName,
      middle_name: myform.middleName,
      last_name: myform.lastName,
      uid: myform.uid,
      institution: this.props.institution,
      doj: myform.doj,
      gender: myform.gender,
      mt: myform.mt,
      staff_type: myform.staffType,
    };

    this.props.save(teacher, this.props.teacher.id);
  };

  render() {
    const { languages, staffTypes, teacher, isOpen, canSubmit } = this.props;
    const genderOptions = [
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Female',
        value: 'female',
      },
    ];
    const { first_name, last_name, middle_name, uid, mt, doj, gender, staff_type } = teacher;

    return (
      <Modal
        title="Create Teacher"
        contentLabel="Create Teacher"
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
            return (this.myform = ref);
          }}
        >
          <Input
            name="firstName"
            id="firstName"
            value={this.getValue(first_name)}
            label="First Name"
            type="text"
            required
            validations="minLength:1"
          />
          <Input
            name="middleName"
            id="middleName"
            value={this.getValue(middle_name)}
            label="Middle Name"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="lastName"
            id="lastName"
            value={this.getValue(last_name)}
            label="Last Name"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="doj"
            id="doj"
            value={this.getValue(doj)}
            label="Date of Join"
            type="date"
            validations="minLength:1"
          />
          <Input
            name="uid"
            id="uid"
            value={this.getValue(uid)}
            label="UID/Addaar No."
            type="text"
            validations="minLength:1"
          />
          <Select
            name="gender"
            label="Gender"
            value={this.getValue(gender)}
            options={genderOptions}
          />
          <Select name="mt" label="Language" value={this.getValue(mt)} options={languages} />
          <Select
            name="staffType"
            label="Staff Type"
            value={this.getValue(staff_type)}
            options={staffTypes}
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditTeacherForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  closeConfirmModal: PropTypes.func,
  institution: PropTypes.number,
  staffTypes: PropTypes.array,
  languages: PropTypes.array,
  teacher: PropTypes.object,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  const teacherVal = state.teachers.teachers.find((teacher) => {
    return state.teachers.editTeacherId === teacher.id;
  });

  return {
    isOpen: state.modal.editTeacher,
    canSubmit: state.appstate.enableSubmitForm,
    teacher: teacherVal || {},
    languages: state.languages.languages,
    staffTypes: getStaffTypes(state.schoolSelection.primarySchool),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form, id) => {
      dispatch(editTeacher(form, id));
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
