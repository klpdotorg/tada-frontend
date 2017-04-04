import React, { Component } from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import moment from 'moment';

const { Input, RadioGroup } = FRC;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// class MyForm extends Component {
//   constructor(props) {
//   		super(props);
//   	}

//   render() {
//   	return (
//   		<Formsy.Form {...this.props} ref="formsy">
//   			{this.props.children}
//   		</Formsy.Form>
//   		);
//   }
// }//End of the MyForm Class

export default class CreateProgram extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			layout: 'horizontal',
			validatePristine: false,
			disabled: false,
			canSubmit:false
		}
		this.enableSubmitButton = this.enableSubmitButton.bind(this);
		this.disableSubmitButton = this.disableSubmitButton.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
		
	}

	submitForm()
	{
		var myform = this.myform.getModel();

		this.props.handleSubmit(myform.programName,myform.description, myform.startDate, myform.endDate, myform.active,myform.programmeInstCat);
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

	setStartDate() {
		var formatteddate = moment().format('YYYY-MM-DD');
		return formatteddate;
	}

	setEndDate() {
		return moment().add('years', 1).format('YYYY-MM-DD');
	}

	render()
	{
		var radioOptions = [
            {value: '1', label: 'Yes'},
            {value: '0', label: 'No'}
           
        ];
        var instType=[
        	{value: '1', label: 'Primary School'},
        	{value: '2', label: 'Preschool'}
        ];
		return(
			<Modal contentLabel="Create Program" isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal} style = { customStyles }>
				<div className="modal-dialog" role="document">
            		<div className="modal-content">
                		<div className="modal-header">
                    		<button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    		<h4 className="modal-title" id="createAssessmentTitle">Create Program</h4>
                		</div>
                		<div className="modal-body">
						<Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
								disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
							<Input name="programName" id="programName" value="" label="Program" type="text"
								placeholder="Please enter the program name" help="This is a required field" required validations="minLength:1"/>
							<Input name="description" id="description" value="" label="Description" type="text" placeholder="Please enter the program description (Optional)"/>
							<Input name="startDate" id="startDate" type="date" label="Start Date" value={this.setStartDate()} placeholder="Please select the start date of the program" required/>
							<Input name="endDate" id="endDate" type="date" label="End Date" value={this.setEndDate()} placeholder="Please select the end date of the program" required/>
						
                        	<RadioGroup
	                            name="programmeInstCat"
	                            type="inline"
	                            label="Institution Type"
	                            help="Select institution type"
	                            options={instType}
	                            required
                        	/>
						</Formsy.Form>
						</div>
               		  <div className="modal-footer">
                 		 <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Cancel</button>
                 		 <button type="button" disabled={!this.state.canSubmit} className="btn btn-primary" onClick={this.submitForm}>Create</button>
              		 </div>
              		</div>
              	</div>
			</Modal>
			);
	}
}