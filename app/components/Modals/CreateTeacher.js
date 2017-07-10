import React, { Component } from 'react';
import Formsy from 'formsy-react';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import Modal from './ModalTemplate';

const { Input } = FRC;

class CreateTeacher extends Component {
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

  disabledSubmitButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  submitForm = () => {
    console.log(this.myform.getModel());
  };

  render() {
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
            type="text"
            value=""
            validations="minLength:1"
          />
          <Input
            name="total_work_experience_months"
            id="total_work_experience_months"
            value=""
            label="Total Work Experience Months"
            type="text"
            value=""
            validations="minLength:1"
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
            name="school_id"
            id="school_id"
            value=""
            label="School ID"
            type="text"
            value=""
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
