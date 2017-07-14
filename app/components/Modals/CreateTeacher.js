import React, { Component } from 'react';
import Formsy from 'formsy-react';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import Modal from './ModalTemplate';

const { Input, Select } = FRC;

class CreateTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      gender: 'male',
    };
  }

  enableSubmitButton = () => {
    this.setState({
      canSubmit: true,
    });
  };

  disabledSubmitButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  submitForm = () => {
    this.props.onSubmit(this.myform.getModel());
  };

  render() {
    const { institution } = this.props;
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
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.enableSubmitButton}
          onInvalid={this.disableSubmitButton}
          ref={ref => (this.myform = ref)}
        >
          <Input
            name="first_name"
            id="first_name"
            value=""
            label="First Name"
            type="text"
            value=""
            required
            validations="minLength:1"
          />
          <Input
            name="middle_name"
            id="middle_name"
            value=""
            label="Middle Name"
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="last_name"
            id="last_name"
            value=""
            label="Last Name"
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="contact_no"
            id="contact_no"
            value=""
            label="Contact No"
            type="number"
            value=""
            validations="minLength:1"
          />
          <Select name="gender" label="Gender" value="male" options={gender} />
          <Input
            name="qualification"
            id="qualification"
            value=""
            label="Qualification"
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="total_work_experience_years"
            id="total_work_experience_years"
            value=""
            label="Total Work Experience Years"
            type="number"
            value=""
            validations="minLength:1"
            required
          />
          <Input
            name="total_work_experience_months"
            id="total_work_experience_months"
            value=""
            label="Total Work Experience Months"
            type="number"
            value=""
            validations="minLength:1"
            required
          />
          <Input
            name="subject"
            id="subject"
            value=""
            label="Subject"
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="institution"
            id="institution"
            value=""
            label="School ID"
            type="text"
            value={institution}
            validations="minLength:1"
          />
          <Input
            name="address"
            id="address"
            value=""
            label="Address"
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="area"
            id="area"
            value=""
            label="Area"
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="pincode"
            id="pincode"
            value=""
            label="Pincode"
            type="text"
            value=""
            validations="minLength:1"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateTeacher.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default CreateTeacher;
