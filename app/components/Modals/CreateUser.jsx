import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';


const { Input, Select } = FRC;



export default class CreateUser extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			disabled: false,
			canSubmit:false
		}
		this.enableSubmitButton = this.enableSubmitButton.bind(this);
		this.disableSubmitButton = this.disableSubmitButton.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm()
	{
		var myform = this.myform.getModel();

		this.props.handleSubmit(myform.firstName,myform.lastName,myform.userName, myform.email, myform.password, myform.role);
	}

	enableSubmitButton() {
		this.setState({
			canSubmit:true
		})
	}

	disableSubmitButton(){
		this.setState({
			canSubmit: false
		})
	}

	render()
	{
		var role = [
            {value: 'tada_deo', label: 'Data Entry Operator'},
            {value: 'tada_admin', label: 'Admin'},
            {value: 'tada_dee', label: 'Data Entry Executive'}
        ];

		return(
      <Modal
        title='Create User'
        contentLabel='Create User'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
            disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
          <Input name="firstName" id="firstName" value="" label="First Name" type="text"
            placeholder="Please enter the user's first name" help="This is a required field"/>
          <Input name="lastName" id="lastName" value="" label="Last Name" type="text"
            placeholder="Please enter the user's last name" help="This is a required field"/>
          <Input name="email" id="email" placeholder="Please enter a valid email address" label="E-mail" validations="isEmail"/>
          <Input name="userName" id="userName" value="" label="User ID" type="text" placeholder="Please enter the unique username" required validations="isAlphanumeric,minLength:6,maxLength:15"/>
          <Input name="password" id="password" type="password" label="Password"
            validationError="password should be minimum of 8 chars."
             required validations="minLength:8"/>
          <Input name="retypePassword" id="retypePassword" type="password" label="Re-type Password" required validations={{
              doPasswordsMatch: function(values, value){
                return values.password == value ? true: "Passwords do not match";
              }

          }}/>
          <Select
            name="role"
            label="Role"
            options={role}
            value='tada_deo'
            required
          />
        </Formsy.Form>
			</Modal>
			);
	}
}
