import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const { Input, Select } = FRC;

import { modalStyle as customStyles } from '../../styles.js';


export default class EditUser extends Component {
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

		this.props.handleSubmit(this.props.user.id,myform.firstName,myform.lastName, myform.email, myform.role);
	}

	enableSubmitButton() {
		this.setState({
			canSubmit:true
		})
	}

	disableSubmitButton(){
		this.setState({
			canSubmit:false
		})
	}

	render()
	{
		var role = [
            {value: 'tada_deo', label: 'Data Entry Operator'},
            {value: 'tada_admin', label: 'Admin'},
            {value: 'tada_dee', label: 'Data Entry Executive'}
        ];
        var userRole= "tada_deo";
		//This code assumes that a user will have only ONE role. If ever that changes,
		//this code has to be revisited so he/she is assigned the highest possible permission.
        if(this.props.user.groups && this.props.user.groups.length>0) {
        	this.props.user.groups.map((item, index) => {
	          userRole=item.name;
        	});
		}
        if(!this.props.user)
        	return null;
		return(
      <Modal
        title='Edit User'
        contentLabel='Edit User'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
            ref={(ref) => this.myform = ref}>
          <Input name="userName" id="userName" value="" label="User ID" type="text" help="This field cannot be modified" disabled="true" value={this.props.user.username}/>

          <Input name="firstName" id="firstName" value="" label="First Name" type="text"
            placeholder="Please enter the user's first name" validations="isSpecialWords" validationError="A name can only consist of letters and spaces" value={this.props.user.first_name}/>
          <Input name="lastName" id="lastName" value="" label="Last Name" type="text"
            placeholder="Please enter the user's last name" validations="isSpecialWords" validationError="A name can only consist of letters and spaces" value={this.props.user.last_name}/>
          <Input name="email" id="email" placeholder="Please enter a valid email address" validationError="This is not a valid email address" label="E-mail" validations="isEmail" value={this.props.user.email}/>

          <Select
            name="role"
            label="Role"
            options={role}
            value={userRole}
            required
          />
        </Formsy.Form>
			</Modal>
			);
	}
}
