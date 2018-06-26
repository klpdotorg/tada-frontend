import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import get from 'lodash.get';

import { Modal } from '../../components/Modal';
import { lastVerifiedYears } from '../../Data';
import {
  modifyStudent,
  enableSubmitForm,
  disableSubmitForm,
  setParentNode,
  getLanguages,
} from '../../actions';

const { Input, Select } = FRC;

class EditStudentForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.getLanguages();
  }

  getValue(value) {
    return value || '';
  }

  submitForm() {
    const { studentGroupId, student } = this.props;
    const myform = this.myform.getModel();
    const updateStudent = {
      first_name: myform.firstName,
      middle_name: myform.middleName,
      last_name: myform.lastName,
      uid: myform.uid,
      mt: myform.language,
      gender: myform.gender,
      dob: myform.dob,
      academic_year: myform.academic_year,
      father_name: myform.father_name,
      mother_name: myform.mother_name,
      id: student.id,
      institution: student.institution,
      status: 'AC',
    };

    this.props.modifyStudent(studentGroupId, updateStudent);
  }

  render() {
    const { title, isOpen, canSubmit, student, languages } = this.props;
    const {
      first_name,
      middle_name,
      last_name,
      uid,
      gender,
      mt,
      dob,
      academic_year,
      father_name,
      mother_name,
    } = student;
    const selectGender = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }];

    return (
      <Modal
        title={title}
        contentLabel={title}
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
          <div className="col-sm-12">
            <Input
              name="firstName"
              id="firstName"
              value={this.getValue(first_name)}
              label="First Name:"
              type="text"
              className="form-control"
              validations="minLength:1"
              required
            />
          </div>
          <div className="col-sm-12">
            <Input
              name="middleName"
              id="middleName"
              value={this.getValue(middle_name)}
              label="Middle Name:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Input
              name="lastName"
              id="lastName"
              value={this.getValue(last_name)}
              label="Last Name:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Input
              name="uid"
              id="uid"
              value={this.getValue(uid)}
              label="Government student ID:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Input
              name="dob"
              id="date"
              value={this.getValue(dob)}
              label="DOB:"
              type="date"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Select name="gender" label="Gender" value={gender} options={selectGender} />
          </div>
          <div className="col-sm-12">
            <Select name="language" label="Mother Tongue" value={mt} options={languages} />
          </div>
          <div className="col-sm-12">
            <Input
              name="father_name"
              id="father_name"
              value={this.getValue(father_name)}
              label="Father Name:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Input
              name="mother_name"
              id="mother_name"
              value={this.getValue(mother_name)}
              label="Mother Name:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Select
              name="academic_year"
              id="academic_year"
              label="Acadamic Year"
              value={this.getValue(academic_year) || '0607'}
              options={lastVerifiedYears}
            />
          </div>
        </Formsy.Form>
      </Modal>
    );
  }
}

EditStudentForm.propTypes = {
  title: PropTypes.string,
  studentGroupId: PropTypes.any,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  languages: PropTypes.array,
  student: PropTypes.object,
  getLanguages: PropTypes.func,
  modifyStudent: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  const id = state.students.editStudentId;

  return {
    title: 'Edit Student',
    isOpen: state.modal.editStudent,
    id,
    student: get(state.boundaries.boundaryDetails, `[${id}]`, {}),
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.languages.languages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeConfirmModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'editStudent',
      });
    },
    modifyStudent: (groupId, student) => {
      dispatch(modifyStudent(groupId, student));
    },
    enableSubmitForm: () => {
      dispatch(enableSubmitForm());
    },
    disableSubmitForm: () => {
      dispatch(disableSubmitForm());
    },
    getLanguages: () => {
      dispatch(getLanguages());
    },
  };
};

const EditStudent = connect(mapStateToProps, mapDispatchToProps)(EditStudentForm);

export { EditStudent };
