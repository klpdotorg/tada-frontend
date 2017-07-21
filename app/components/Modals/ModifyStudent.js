import React, { Component } from 'react';
import Modal from './ModalTemplate';
import { clone, groupBy } from 'lodash';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const { Input, Textarea, Select } = FRC;
import { modalStyle as customStyles } from '../../styles.js';

export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };
  }

  enableSubmitButton = () => {
    this.setState({
      canSubmit: true,
    });
  };

  disableSubmitButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  saveStudent = () => {
    const myform = this.myform.getModel();
    const data = this.getStudentData();
    const student = {
      id: data.id,
      first_name: myform.firstName,
      middle_name: myform.middleName,
      last_name: myform.lastName,
      uid: myform.uid,
      dob: myform.dob,
      gender: myform.gender,
      mt: myform.language,
      active: data.active,
      Father: {
        first_name: myform.fatherFirstName,
        id: data.Father.id,
        last_name: myform.fatherLastName,
        middle_name: myform.fatherMiddleName,
        relation_type: data.Father.relation_type,
      },
      Mother: {
        first_name: myform.motherFirstName,
        id: data.Mother.id,
        last_name: myform.motherLastName,
        middle_name: myform.motherMiddleName,
        relation_type: data.Mother.relation_type,
      },
    };

    this.props.saveStudent(student);
  };

  getStudentData() {
    const { data } = this.props;
    let relations;

    if (data) {
      relations = groupBy(data.relations, 'relation_type');
      relations = {
        Father: relations.Father[0],
        Mother: relations.Mother[0],
      };
    }

    return {
      ...data,
      ...relations,
    };
  }

  render() {
    const selectGender = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }];

    const { languages } = this.props;

    const {
      first_name,
      middle_name,
      last_name,
      uid,
      mt,
      gender,
      language,
      dob,
      Father,
      Mother,
    } = this.getStudentData();

    return (
      <Modal
        title="Edit Student"
        contentLabel="Edit Student"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={true}
        submitForm={this.saveStudent}
        cancelBtnLabel="Discard"
      >
        <Formsy.Form
          onValidSubmit={this.saveStudent}
          onValid={this.enableSubmitButton}
          onInvalid={this.disableSubmitButton}
          ref={ref => (this.myform = ref)}
        >
          <div className="col-sm-12">
            <Input
              name="firstName"
              id="firstName"
              value={first_name || ''}
              label="First Name:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Input
              name="middleName"
              id="middleName"
              value={middle_name || ''}
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
              value={last_name || ''}
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
              value={uid || ''}
              label="Government student ID:"
              type="text"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
            <Select name="gender" label="Gender" value={gender} options={selectGender} />
          </div>
          <div className="col-sm-12">
            <Select name="language" label="language" value={mt} options={languages.list} />
          </div>
          <div className="col-sm-12">
            <Input
              name="dob"
              id="date"
              value={dob || ''}
              label="DOB:"
              type="date"
              className="form-control"
              validations="minLength:1"
            />
          </div>
          <div className="col-sm-12">
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
          </div>
        </Formsy.Form>
      </Modal>
    );
  }
}
