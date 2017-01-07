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

export default class CreateAssessment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      assessment: e.target.value
    });
  }

  handleSubmit(){
    
    this.props.handleSubmit(this.assessmentName.value, this.startDate.value, this.endDate.value, 1, this.doubleEntry.checked, this.type.value);
  }

  render() {  
    return (
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onClose}>
        {/* Title of modal window */}
       
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.onClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="createAssessmentTitle">Create Assessment</h4>
                </div>
                <div className="modal-body">
                    <form id="createAssessment">
                    
                      <div className="form-group">
                          <label htmlFor="assessmentName" className="control-label">Assessment:</label>
                          <input type="text" className="form-control" required autofocus id="assessmentName" ref={(ref) => this.assessmentName = ref}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="startDate" className="control-label">Start Date:</label>
                          <input type="date" className="form-control" required autofocus id="startDate" ref={(ref) => this.startDate = ref}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="endDate" className="control-label">End Date:</label>
                          <input type="date" className="form-control" required autofocus id="endDate" ref={(ref) => this.endDate = ref}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="type" className="control-label">Type:</label>
                          <select className="form-control" required autofocus id="type" ref={(ref) => this.type = ref} defaultValue="1">
                            <option value="2">Class</option>
                            <option value="3">Student</option>
                            <option value="1">Institution</option>
                          </select>
                      </div>
                      <div className="checkbox">
                          <input type="checkbox" id="doubleEntry" ref={(ref) => this.doubleEntry = ref}/> Double Entry
                      </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.props.onClose}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
              </div>
          </div>
          </div>
      </Modal>
    )
  }

}

