import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';


const { Input, Select } = FRC;


export default class ConfirmPassword extends Component {
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

		this.props.handleSubmit( myform.password );
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

	render() {

		return(
      <Modal
        title='Current Password'
        contentLabel='Current Password'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
        submitBtnLabel='Continue'
        cancelBtnLabel='Cancel'
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
            disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
          <Input name="password" id="password" help="Please enter your current password and press continue" type="password" label="Password" required/>
        </Formsy.Form>
			</Modal>
			);
	}
}
