import React, { Component } from 'react';
import Modal from 'react-modal';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

const { Checkbox, Input, RadioGroup } = FRC;


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

export default class EditAssessment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      type: props.assessment.type,
      canSubmit: true
    }
   
    this.handleSave = this.handleSave.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
  }

  componentDidMount(){

   console.info(this.myform);

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

 /* mapInputs(inputs)
  {
    return {
      'name' : inputs.assessmentName,
      'start_date' : inputs.startDate,
      'end_date': inputs.endDate,
      'type' : inputs.type,
      'double_entry': inputs.doubleEntry
    }
  } */

  handleChange(prop,value) {
    this.setState({
      type: value
    });
  }

  handleSave(){   
    var myform = this.myform.getModel();
    this.props.handleEditAssessment(this.props.assessment.id,myform.assessmentName, myform.startDate, myform.endDate, 1, myform.doubleEntry, myform.type);
  }

  render() {  
  var type=[
      {value: '1', label: 'Institution'},
      {value: '2', label: 'Class'},
      {value: '3', label: 'Student'}
    ];

    var typeStr = '1';
    if(this.props.assessment != -1)
    {
      typeStr = this.props.assessment.type.toString();
    }
    return (
      <Modal contentLabel="Edit Assessment" isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal}>
        {/* Title of modal window */}
       
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="editAssessmentTitle">Edit Assessment</h4>
                </div>
                <div className="modal-body">
                  <Formsy.Form ref={(form) => {this.myform = form}} id="createAssessment" onValidSubmit={this.handleSave} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}>
                   
                     
                     <Input name="assessmentName" id="assessmentName" label="Name" type="text"
                placeholder="Please enter the assessment name" help="This is a required field" required validations="minLength:1" value={this.props.assessment.name}/>
                      <Input type="date" label="Start Date" name="startDate" help="Please select the start date of the assessment" required id="startDate" value={this.props.assessment.start_date}/>
                      
                      
                      <Input type="date" label="End Date"  help="Please select the end date of the assessment" required name="endDate" value={this.props.assessment.end_date}/>
                      
                      <RadioGroup
                              name="type"
                              type="inline"
                              label="Type"
                              help="Select the type of this assessment"
                              options={type}
                              value={typeStr}
                              required
                          />
                     
                     
                      <Checkbox label="Double Entry" name="doubleEntry" id="doubleEntry" help="Check this box if this assessment will need double entry" value={this.props.assessment.double_entry}/> 
                      
                </Formsy.Form>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Cancel</button>
                  <button type="button" className="btn btn-primary"  disabled={!this.state.canSubmit} onClick={this.handleSave}>Save</button>
              </div>
          </div>
          </div>
          </div>
      </Modal>
    );
  }

}

