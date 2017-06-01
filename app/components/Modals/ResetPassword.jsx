import React, { Component } from 'react';
import Modal from 'react-modal';
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

		this.props.handleSubmit(this.props.user.id,myform.password);
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
			<Modal contentLabel="Reset Password" isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal} style = { customStyles }>
				<div className="" role="document">
            		<div className="modal-content">
                		<div className="modal-header">
                    		<button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    		<h4 className="modal-title" id="resetPasswordTitle">Reset Password</h4>
                		</div>
                		<div className="modal-body">
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
						</div>
               		  <div className="modal-footer">
                 		 <button type="button" className="btn btn-primary" onClick={this.props.onCloseModal}>Discard</button>
                 		 <button type="button" disabled={!this.state.canSubmit} className="btn btn-primary" onClick={this.submitForm}>Save</button>
              		 </div>
              		</div>
              	</div>
			</Modal>
			);
	}
}