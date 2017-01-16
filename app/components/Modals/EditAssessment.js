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
      value: '',
      type: props.assessment.type,
      canSubmit: true
    }
   
    this.handleSave = this.handleSave.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
  }

  componentDidMount(){

    //console.log("My form refs", this.myform.refs);

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


  handleChange(value) {
    console.log("handle change", this.assessmentType.elements);
    this.setState({
      type:this.myform.getModel().type
    });
  }

  handleSave(myform){   
    this.props.handleEditAssessment(this.props.assessment.id,myform.assessmentName, myform.startDate, myform.endDate, 1, myform.doubleEntry, myform.type);
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
                    <Formsy.Form id="createAssessment" onValidSubmit={this.handleSave} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
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
                              defaultChecked={this.props.assessment.type}
                              
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

