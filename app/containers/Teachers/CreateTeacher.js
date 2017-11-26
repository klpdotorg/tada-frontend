import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { get } from 'lodash';

import { Modal } from '../../components/Modal';

import { saveNewTeacher, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input, Select } = FRC;

class CreateTeacherForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
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
      staff_type: 2,
      status: 'AC',
    };

    this.props.save(teacher);
  }

  render() {
    const { languages, canSubmit, isOpen } = this.props;
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
            value=""
            label="First Name"
            type="text"
            required
            validations="minLength:1"
          />
          <Input
            name="middleName"
            id="middleName"
            value=""
            label="Middle Name"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="lastName"
            id="lastName"
            value=""
            label="Last Name"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="doj"
            id="doj"
            value=""
            label="Date of Birth"
            type="date"
            validations="minLength:1"
          />
          <Input
            name="uid"
            id="uid"
            value=""
            label="UID/Addaar No."
            type="text"
            validations="minLength:1"
          />
          <Select name="gender" label="Gender" value="male" options={gender} />
          <Select
            name="mt"
            label="Language"
            value={get(languages[0], 'value')}
            options={languages}
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateTeacherForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  languages: PropTypes.array,
  closeConfirmModal: PropTypes.func,
  institution: PropTypes.number,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createTeacher,
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.languages.languages,
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

const CreateTeacher = connect(mapStateToProps, mapDispatchToProps)(CreateTeacherForm);

export { CreateTeacher };
