import React, { Component } from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const { Input, RadioGroup , Checkbox} = FRC;

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

export default class CreateAssessment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false
    }
    this.submitForm = this.submitForm.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
  }

  submitForm(){
    var myform = this.myform.getModel();
    this.props.handleSubmit(myform.assessmentName, myform.startDate, myform.endDate, 2, myform.doubleEntry, myform.type);
  }

  enableSubmitButton() {
    this.setState({
      canSubmit:true
    });
  }

  disableSubmitButton(){
    this.setState({
      canSubmit: false
    });
  }

  render() {  

    var type=[
      {value: '1', label: 'Institution'},
      {value: '2', label: 'Class'},
      {value: '3', label: 'Student'}
    ];
    return (
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onClose}>
        {/* Title of modal window */}
       
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="createAssessmentTitle">Create Assessment</h4>
                </div>
                <div className="modal-body">
                    <Formsy.Form id="createAssessment" onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
                disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
                    
                     
                     <Input name="assessmentName" id="assessmentName" value="" label="Name" type="text"
                placeholder="Please enter the assessment name" help="This is a required field" required validations="minLength:1"/>
                      <Input type="date" label="Start Date" name="startDate" help="Please select the start date of the assessment" required id="startDate"/>
                      
                      
                      <Input type="date" label="End Date"  help="Please select the end date of the assessment" required name="endDate"/>
                      
                      <RadioGroup
                              name="type"
                              type="inline"
                              label="Type"
                              help="Select the type of this assessment"
                              options={type}
                              required
                          />
                     
                     
                      <Checkbox label="Double Entry" name="doubleEntry" id="doubleEntry" help="Check this box if this assessment will need double entry"/> 
                      
                    </Formsy.Form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.submitForm} disabled={!this.state.canSubmit}>Create</button>
              </div>
          </div>
          </div>
      </Modal>
    )
  }

}

