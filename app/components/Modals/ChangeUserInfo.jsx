import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';


const { Input, Select } = FRC;



export default class ChangeUserInfo extends Component {
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

		this.props.handleSubmit(myform.email, myform.firstName, myform.lastName, myform.phone);
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

		return(
      <Modal
        title='Change Profile'
        contentLabel='Change Profile'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel='Cancel..'
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
            disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
          <Input name="email" id="email" type="text" label="E-mail"  validations="isEmail,minLength:1" defaultValue={this.props.email}/>
          <Input name="firstName" id="firstName" type="text" label="First Name" validations="isAlpha" defaultValue={this.props.firstname}/>
          <Input name="lastName" id="lastName" type="text" label="Last Name"  validations="isAlpha" defaultValue={this.props.lastname}/>
          <Input name="phone" id="phone" type="text" label="Mobile" validations="isNumeric"/>

        </Formsy.Form>
			</Modal>
			);
	}
}
