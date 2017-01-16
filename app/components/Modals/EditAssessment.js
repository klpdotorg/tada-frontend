import React, { Component } from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


const { Input, RadioGroup, Checkbox } = FRC;

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
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e) {
    this.setState({
      assessment: e.target.value
    });
  }

  handleSave(){
    console.log("Saving assessment",this.type.value);
   
    this.props.handleEditAssessment(this.props.assessment.id,this.assessmentName.value, this.startDate.value, this.endDate.value, 1, this.doubleEntry.checked, this.type.value);
  }

  render() {  
  var type=[
      {value: 1, label: 'Institution'},
      {value: 2, label: 'Class'},
      {value: 3, label: 'Student'}
    ];
    return (
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal}>
        {/* Title of modal window */}
       
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="editAssessmentTitle">Edit Assessment</h4>
                </div>
                <div className="modal-body">
                    <Formsy.Form id="createAssessment" onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
                disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
                    
                     
                     <Input name="assessmentName" id="assessmentName" label="Name" type="text"
                placeholder="Please enter the assessment name" help="This is a required field" required validations="minLength:1" defaultValue={this.props.assessment.name}/>
                      <Input type="date" label="Start Date" name="startDate" help="Please select the start date of the assessment" required id="startDate" defaultValue={this.props.assessment.start_date}/>
                      
                      
                      <Input type="date" label="End Date"  help="Please select the end date of the assessment" required name="endDate" defaultValue={this.props.assessment.end_date}/>
                      
                      <RadioGroup
                              name="type"
                              type="inline"
                              label="Type"
                              help="Select the type of this assessment"
                              options={type}
                              required
                              value={this.props.assessment.type}
                          />
                     
                     
                      <Checkbox label="Double Entry" name="doubleEntry" id="doubleEntry" help="Check this box if this assessment will need double entry" value={this.props.assessment.double_entry}/> 
                      
                </Formsy.Form>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
              </div>
          </div>
          </div>
          </div>
      </Modal>
    );
  }

}

