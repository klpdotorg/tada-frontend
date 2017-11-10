import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { get } from 'lodash';

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
    const { studentGroupNodeId } = this.props;
    const myform = this.myform.getModel();
    const student = {
      first_name: myform.firstName,
      middle_name: myform.middleName,
      last_name: myform.lastName,
      uid: myform.uid,
      mt: myform.language,
      gender: myform.gender,
      dob: myform.dob,
      acdamic_year: myform.acdamicYear,
    };

    this.props.modifyStudent(studentGroupNodeId, this.props.student.id, student);
  }

  render() {
    const { title, isOpen, canSubmit, student, languages } = this.props;
    const { first_name, middle_name, last_name, uid, gender, mt, dob, acdamic_year } = student;
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
            <Select name="language" label="Language" value={mt} options={languages} />
          </div>
          <div className="col-sm-12">
            <Select
              name="acdamicYear"
              label="Acadamic Year"
              value={this.getValue(acdamic_year)}
              options={lastVerifiedYears}
            />
          </div>
          {/* <div className="col-sm-12">
                      <Input
                        name="fatherFirstName"
                        id="fatherFirstName"
                        value={Father ? Father.first_name || '' : ''}
                        label="Father First Name:"
                        type="text"
                        className="form-control"
                        validations="minLength:1"
                      />
                    </div>
                    <div className="col-sm-12">
                      <Input
                        name="fatherMiddleName"
                        id="fatherMiddleName"
                        value={Father ? Father.middle_name || '' : ''}
                        label="Father Middle Name:"
                        type="text"
                        className="form-control"
                        validations="minLength:1"
                      />
                    </div>
                    <div className="col-sm-12">
                      <Input
                        name="fatherLastName"
                        id="fatherLastName"
                        value={Father ? Father.last_name || '' : ''}
                        label="Father Last Name:"
                        type="text"
                        className="form-control"
                        validations="minLength:1"
                      />
                    </div>
                    <div className="col-sm-12">
                      <Input
                        name="motherFirstName"
                        id="motherFirstName"
                        value={Mother ? Mother.first_name || '' : ''}
                        label="Mother First Name:"
                        type="text"
                        className="form-control"
                        validations="minLength:1"
                        required={true}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Input
                        name="motherMiddleName"
                        id="motherMiddleName"
                        value={Mother ? Mother.middle_name || '' : ''}
                        label="Mother Middle Name:"
                        type="text"
                        className="form-control"
                        validations="minLength:1"
                      />
                    </div>
                    <div className="col-sm-12">
                      <Input
                        name="motherLastName"
                        id="motherLastName"
                        value={Mother ? Mother.last_name || '' : ''}
                        label="Mother Last Name:"
                        type="text"
                        className="form-control"
                        validations="minLength:1"
                      />
                    </div> */}
        </Formsy.Form>
      </Modal>
    );
  }
}

EditStudentForm.propTypes = {
  title: PropTypes.string,
  studentGroupNodeId: PropTypes.string,
  id: PropTypes.string,
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
    modifyStudent: (studentGroupNodeId, studentId, form) => {
      dispatch(setParentNode(studentGroupNodeId));
      dispatch(modifyStudent(studentId, form));
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
