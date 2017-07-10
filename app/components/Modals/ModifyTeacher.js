import React, { Component } from 'react';
import Formsy from 'formsy-react';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import Modal from './ModalTemplate';

const { Input } = FRC;

const DATA = {
  first_name: 'Pankaj',
  middle_name: '',
  last_name: 'Thakur',
  contact_no: '8627019381',
  qualification: '10th',
  total_work_experience_years: 3,
  total_work_experience_months: 12,
  subject: 'Math',
  school_id: 12,
  address: 'Benglore',
  area: 'Sundernager',
  pincode: '175036',
};

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
    const {
      first_name,
      last_name,
      middle_name,
      contact_no,
      qualification,
      total_work_experience_years,
      total_work_experience_months,
      subject,
      school_id,
      address,
      area,
      pincode,
    } = DATA;

    return (
      <Modal
        title="Edit Teacher"
        contentLabel="Edit Teacher"
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
            value={first_name}
            required
            validations="minLength:1"
          />
          <Input
            name="middle_name"
            id="middle_name"
            value=""
            label="Middle Name"
            type="text"
            value={middle_name}
            validations="minLength:1"
          />
          <Input
            name="last_name"
            id="last_name"
            value=""
            label="Last Name"
            type="text"
            value={last_name}
            validations="minLength:1"
          />
          <Input
            name="contact_no"
            id="contact_no"
            value=""
            label="Contact No"
            type="number"
            value={contact_no}
            validations="minLength:1"
          />
          <Input
            name="qualification"
            id="qualification"
            value=""
            label="Qualification"
            type="text"
            value={qualification}
            validations="minLength:1"
          />
          <Input
            name="total_work_experience_years"
            id="total_work_experience_years"
            value=""
            label="Total Work Experience Years"
            type="text"
            value={total_work_experience_years}
            validations="minLength:1"
          />
          <Input
            name="total_work_experience_months"
            id="total_work_experience_months"
            value=""
            label="Total Work Experience Months"
            type="text"
            value={total_work_experience_months}
            validations="minLength:1"
          />
          <Input
            name="subject"
            id="subject"
            value=""
            label="Subject"
            type="text"
            value={subject}
            validations="minLength:1"
          />
          <Input
            name="school_id"
            id="school_id"
            value=""
            label="School ID"
            type="text"
            value={school_id}
            validations="minLength:1"
          />
          <Input
            name="address"
            id="address"
            value=""
            label="Address"
            type="text"
            value={address}
            validations="minLength:1"
          />
          <Input
            name="area"
            id="area"
            value=""
            label="Area"
            type="text"
            value={area}
            validations="minLength:1"
          />
          <Input
            name="pincode"
            id="pincode"
            value=""
            label="Pincode"
            type="text"
            value={pincode}
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
