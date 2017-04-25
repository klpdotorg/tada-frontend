import React, { Component } from 'react';
import Modal from 'react-modal';
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
			<Modal contentLabel="Change Password" isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal} style = { customStyles }>
				<div className="" role="document">
            		<div className="modal-content">
                		<div className="modal-header">
                    		<button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    		<h4 className="modal-title" id="resetPasswordTitle">Change Password</h4>
                		</div>
                		<div className="modal-body">
					{/*	<Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
								disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
							<Input name="email" id="email" type="text" label="E-mail"  validations="isEmail, minLength:1"/>
							<Input name="firstName" id="firstName" type="text" label="First Name" validations="isAlpha"/>
							<Input name="lastName" id="lastName" type="text" label="Last Name"  validations="isAlpha"/>
							<Input name="phone" id="phone" type="text" label="Mobile" validations="isNumeric"/>

						</Formsy.Form>*/}
						</div>
               		  <div className="modal-footer">
                 		 <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Cancel</button>
                 		 <button type="button" disabled={!this.state.canSubmit} className="btn btn-primary" onClick={this.submitForm}>Save</button>
              		 </div>
              		</div>
              	</div>
			</Modal>
			);
	}
}
