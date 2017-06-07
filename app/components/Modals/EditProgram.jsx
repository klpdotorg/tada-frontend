import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';


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

export default class EditProgram extends Component {
	constructor(props)
	{
		super(props);
		var instTypeInitVal = 1;
		this.state = {
			layout: 'horizontal',
			validatePristine: false,
			disabled: false,
			canSubmit:true,
			instType: 1
		}
		this.enableSubmitButton = this.enableSubmitButton.bind(this);
		this.disableSubmitButton = this.disableSubmitButton.bind(this);
		this.submitForm = this.submitForm.bind(this);
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

	changeInstCategory(propName, value){
		("Changing category ", value);
		this.setState({
			instType: value
		})
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
        var program = this.props.program;
        var name="", desc="", startdate="", enddate="", instcat="";
        if(program)
        {
        	name=program.name;
        	desc=program.description;
        	startdate=program.start_date;
        	enddate=program.end_date;
        	instcat=program.programme_institution_category.toString();
        }
		return(
      <Modal
        title='Edit Program'
        contentLabel='Edit Program'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel='Cancel'
      >
        <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
            disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
          <Input name="programName" label="Program" type="text"
            placeholder="Please enter the program name" help="This is a required field" required validations="minLength:1" value={name}/>
          <Input name="description" label="Description" type="text" placeholder="Please enter the program description (Optional)" value={desc}/>
          <Input name="startDate" type="date" label="Start Date" placeholder="Please select the start date of the program" required value={startdate}/>
          <Input name="endDate" type="date" label="End Date" placeholder="Please select the end date of the program" required value={enddate}/>

          <RadioGroup
              name="programmeInstCat"
              type="inline"
              label="Institution Type"
              help="Select institution type"
              options={instType}
              required value={instcat}

          />
        </Formsy.Form>
			</Modal>
			);
	}
}
