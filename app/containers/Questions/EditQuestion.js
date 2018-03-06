import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import {
  saveQuestion,
  enableSubmitForm,
  disableSubmitForm,
  toggleEditQuestionModal,
} from '../../actions';
import { QuestionTypes } from '../../Data';

import { Modal } from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class EditQuestionForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getQuestionTypes() {
    return QuestionTypes.map((type) => {
      return {
        value: type.id,
        label: `${type.display} (${type.type})`,
      };
    });
  }

  getQuestionTypeId(typeText) {
    return QuestionTypes.find((type) => {
      return type.display === typeText;
    });
  }

  getValue(field) {
    return get(this.props.question, field, '');
  }

  submitForm() {
    const { programId, assessmentId, questionId } = this.props;
    const myform = this.myform.getModel();
    const question = {
      question_text: myform.qnText,
      display_text: myform.displayText,
      key: myform.key,
      question_type_id: myform.type,
      is_featured: true,
      status: 'AC',
    };

    this.props.save(question, programId, assessmentId, questionId);
  }

  render() {
    const { isOpen, canSubmit, question } = this.props;
    console.log(this.props.question, 'question...');
    const type = this.getQuestionTypeId(get(question, 'question_type', '')) || {};

    return (
      <Modal
        title="Edit Question"
        contentLabel="Create Question"
        onCloseModal={this.props.onCloseModal}
        isOpen={isOpen}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Edit"
      >
        <Formsy.Form
          id="createQuestion"
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          <Textarea
            rows={2}
            cols={60}
            name="qnText"
            label="Question Text"
            value={this.getValue('question_text')}
            placeholder="Please enter the question text"
            validations="minLength:10"
            validationErrors={{
              minLength: 'Please provide at least 10 characters.',
            }}
            required
          />
          <Input
            name="displayText"
            id="displayText"
            value={this.getValue('display_text')}
            label="Display Text"
            type="text"
            placeholder="Please enter the display text"
            required
          />
          <Select
            name="type"
            value={type.id}
            label="Type"
            options={this.getQuestionTypes()}
            required
          />
          <Input
            name="key"
            id="key"
            value={this.getValue('key')}
            label="Key"
            type="text"
            placeholder="Enter key"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditQuestionForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  programId: PropTypes.number,
  assessmentId: PropTypes.number,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  question: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { editQuestion, questions } = state.questions;

  return {
    isOpen: state.modal.editQuestion,
    canSubmit: state.appstate.enableSubmitForm,
    assessmentId: Number(ownProps.assessmentId),
    question: get(questions, editQuestion),
    questionId: editQuestion,
  };
};

const EditQuestion = connect(mapStateToProps, {
  save: saveQuestion,
  enableSubmitForm,
  disableSubmitForm,
  onCloseModal: toggleEditQuestionModal,
})(EditQuestionForm);

export { EditQuestion };
