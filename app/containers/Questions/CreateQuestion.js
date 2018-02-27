import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { createNewQuestion, enableSubmitForm, disableSubmitForm } from '../../actions';
import { QuestionTypes } from '../../Data';

import { Modal } from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class CreateQuestionForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  getQuestionTypes() {
    return QuestionTypes.map((type) => {
      return {
        value: type.id,
        label: `${type.display} (${type.type})`,
      };
    });
  }

  submitForm() {
    const { programId, assessmentId } = this.props;
    const myform = this.myform.getModel();
    const question = {
      question_details: {
        question_text: myform.qnText,
        display_text: myform.displayText,
        key: myform.key,
        question_type_id: myform.type,
        is_featured: true,
        status: 'AC',
      },
    };

    this.props.save(question, programId, assessmentId);
  }

  render() {
    const { isOpen, canSubmit } = this.props;

    return (
      <Modal
        title="Create Question"
        contentLabel="Create Question"
        onCloseModal={this.props.onCloseModal}
        isOpen={isOpen}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Create"
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
            value=""
            label="Display Text"
            type="text"
            placeholder="Please enter the display text"
            required
          />
          <Select name="type" label="Type" options={this.getQuestionTypes()} value="1" required />
          <Input
            name="key"
            id="key"
            value="ivrss-grade"
            label="Key"
            type="text"
            placeholder="Enter key"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateQuestionForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  programId: PropTypes.number,
  assessmentId: PropTypes.number,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.modal.createQuestion,
    canSubmit: state.appstate.enableSubmitForm,
    assessmentId: Number(ownProps.assessmentId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form, programId, assessmentId) => {
      dispatch(createNewQuestion(form, programId, assessmentId));
    },
    enableSubmitForm: () => {
      dispatch(enableSubmitForm());
    },
    disableSubmitForm: () => {
      dispatch(disableSubmitForm());
    },
    onCloseModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createQuestion',
      });
    },
  };
};

const CreateQuestion = connect(mapStateToProps, mapDispatchToProps)(CreateQuestionForm);

export { CreateQuestion };
