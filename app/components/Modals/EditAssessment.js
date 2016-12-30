import React, { Component } from 'react';
import Modal from 'react-modal';

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
    console.log(this.startDate.value);
    console.log(this.endDate.value);
    console.log(this.doubleEntry.value);
    this.props.handleEditAssessment(this.props.assessment.id,this.assessmentName.value, this.startDate.value, this.endDate.value, 1, this.doubleEntry.checked);
  }

  render() {  
    return (
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onClose}>
        {/* Title of modal window */}
       
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.onClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="editAssessmentTitle">Edit Assessment</h4>
                </div>
                <div className="modal-body">
                    <form id="createAssessment">
                    
                      <div className="form-group">
                          <label htmlFor="assessmentName" className="control-label">Assessment:</label>
                          <input type="text" className="form-control" required autofocus id="assessmentName" ref={(ref) => this.assessmentName = ref} defaultValue={this.props.assessment.name}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="startDate" className="control-label">Start Date:</label>
                          <input type="date" className="form-control" required autofocus id="startDate" ref={(ref) => this.startDate = ref} defaultValue={this.props.assessment.start_date}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="endDate" className="control-label">End Date:</label>
                          <input type="date" className="form-control" required autofocus id="endDate" ref={(ref) => this.endDate = ref} defaultValue={this.props.assessment.end_date}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="type" className="control-label">Type:</label>
                          <select className="form-control" required autofocus id="type" ref={(ref) => this.type = ref}>
                            <option>Class</option>
                            <option>Student</option>
                            <option>Institution</option>
                          </select>
                      </div>
                      <div className="checkbox">
                          <input type="checkbox" id="doubleEntry" ref={(ref) => this.doubleEntry = ref} defaultValue={this.props.assessment.double_entry}/> Double Entry
                      </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.props.onClose}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
              </div>
          </div>
          </div>
      </Modal>
    )
  }

}

