import React, { Component } from 'react';
import Modal from 'react-modal';
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

		      this.props.save(myform.class, myform.section, myform.type);
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
		];

		      return (
			<Modal contentLabel="Create Program" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
				<div className="" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title" id="createAssessmentTitle">Create User</h4>
						</div>
						<div className="modal-body">
							<Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
  disabled={this.state.disabled} ref={(ref) => this.myform = ref}
							>
								<Input name="class" id="class" value="" label="Class" type="text"
  placeholder="Please enter the class/grade" help="This is a required field" required validations="isNumeric,minLength:1"
								/>
								<Input name="section" id="section" value="" label="Section" type="text"
  placeholder="Please enter the section" help="This is a required field" required validations="isAlphanumeric,minLength:1"
								/>

								<Select name="type"
  label="Type"
  options={role}
  value="Class"
  required
								/>

							</Formsy.Form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Discard</button>
							<button type="button" disabled={!this.state.canSubmit} className="btn btn-primary" onClick={this.submitForm}>Save</button>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
