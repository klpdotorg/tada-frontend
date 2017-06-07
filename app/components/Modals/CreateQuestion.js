import React, { Component } from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';

const { Input, Textarea, Select, Row } = FRC;

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      isGradeType: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.questionTypeChanged = this.questionTypeChanged.bind(this);
  }

  submitForm() {
    var myform = this.myform.getModel();
    this.props.handleSubmit(
      myform.questionNo,
      myform.qnOrder,
      myform.qnText,
      myform.type,
      myform.grade,
      myform.minMarks,
      myform.maxMarks,
      2,
    );
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

  questionTypeChanged(propName, value) {
    if (value == '2') {
      this.setState({
        isGradeType: true,
      });
    } else {
      this.setState({
        isGradeType: false,
      });
    }
  }

  render() {
    var typeOptions = [{ value: '1', label: 'Marks' }, { value: '2', label: 'Grade' }];
    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.props.onClose} style={customStyles}>
        {/* Title of modal window */}

        <div className="" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.props.onCloseModal}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title" id="title">Create Question</h4>
            </div>
            <div className="modal-body">
              <Formsy.Form
                id="createQuestion"
                onValidSubmit={this.submitForm}
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                disabled={this.state.disabled}
                ref={ref => (this.myform = ref)}
              >
                <Input
                  name="questionNo"
                  id="questionNo"
                  value=""
                  label="Question #"
                  type="text"
                  placeholder="Please enter the qn number"
                  required
                  validations="isNumeric"
                />
                <Input
                  type="text"
                  required
                  label="Question Order"
                  name="qnOrder"
                  validations="isNumeric"
                  placeholder="Please select the order you'd like the question at"
                />
                <Textarea
                  rows={2}
                  cols={60}
                  name="qnText"
                  label="Text"
                  placeholder="Please enter the question text"
                  validations="minLength:10"
                  validationErrors={{
                    minLength: 'Please provide at least 10 characters.',
                  }}
                  required
                />
                <Select
                  name="type"
                  label="Type"
                  options={typeOptions}
                  value="1"
                  required
                  onChange={this.questionTypeChanged.bind(this)}
                />
                <Input name="grade" label="Grade" type="text" disabled={!this.state.isGradeType} />
                <Row layout="horizontal">
                  <Input
                    elementWrapperClassName="col-md-2"
                    name="minMarks"
                    label="Min Score"
                    type="text"
                    validations="isFloat"
                    disabled={this.state.isGradeType}
                  />
                  <Input
                    elementWrapperClassName="col-md-2"
                    name="maxMarks"
                    label="Max Score"
                    type="text"
                    validations="isFloat"
                    disabled={this.state.isGradeType}
                  />
                </Row>
              </Formsy.Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.submitForm}
                disabled={!this.state.canSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
