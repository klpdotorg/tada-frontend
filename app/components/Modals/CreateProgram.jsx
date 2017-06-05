import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import moment from 'moment';
import { modalStyle } from '../../styles.js';
const { Input, RadioGroup } = FRC;


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
		return moment().add(1,'years').format('YYYY-MM-DD');
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
      <Modal
        title='Create Program'
        contentLabel='Create Program'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel='Cancel'
        submitBtnLabel='Create'
      >
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
			</Modal>
			);
	}
}
