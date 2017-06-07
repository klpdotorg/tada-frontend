import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';


const { Input, Select } = FRC;


export default class ResetPassword extends Component {
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

    console.log('calling')
		//this.props.handleSubmit(this.props.user.id,myform.password);
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
        title='Reset Password'
        contentLabel='Reset Password'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
            disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
          <Input name="userName" id="userName" value="" label="User ID" type="text" help="This field cannot be modified" disabled="true" value={this.props.user.username}/>
          <Input name="password" id="password" type="password" label="Password" required validations="minLength:8"/>
          <Input name="retypePassword" id="retypePassword" type="password" label="Re-type Password" required validations={{
              doPasswordsMatch: function(values, value){
                return values.password == value ? true: "Passwords do not match";
              }
          }}/>
        </Formsy.Form>
			</Modal>
			);
	}
}
