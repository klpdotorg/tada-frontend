import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';


const { Input, Select } = FRC;


export default class CreateClass extends Component {
	constructor(props) {
	  super(props);
		this.state = {
      disabled: false,
      canSubmit: false,
		};
	  this.enableSubmitButton = this.enableSubmitButton.bind(this);
	  this.disableSubmitButton = this.disableSubmitButton.bind(this);
	  this.submitForm = this.submitForm.bind(this);
	}

	submitForm() {
	  var myform = this.myform.getModel();
		this.props.save(myform.class, myform.section, myform.group_type);
	}

	enableSubmitButton() {
	  this.setState({
		  canSubmit: true,
		});
	}

	disableSubmitButton() {
		this.setState({
		  canSubmit: false,
		});
	}

  render() {
	  var role = [
			{ value: 'Class', label: 'Class' },
			{ value: 'Center', label: 'Center' },
		];

		return (
      <Modal
        title='Create Class'
        contentLabel='Create Class'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
disabled={this.state.disabled} ref={(ref) => this.myform = ref}
        >
          <Input name="class" id="class" value="" label="Class" type="text"
placeholder="Please enter the class/grade" help="This is a required field" required validations="isAlphanumeric,minLength:1"
          />
          <Input name="section" id="section" value="" label="Section" type="text"
placeholder="Please enter the section" help="This is a required field" validations="isAlphanumeric,minLength:1"
          />

          <Select name="group_type"
            label="Type"
            options={role}
            value="Class"
            required
          />

        </Formsy.Form>
			</Modal>
		);
	}
}
