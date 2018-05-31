import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import {
  createNewQuestion,
  enableSubmitForm,
  disableSubmitForm,
  toggleCreateQuestionModal,
  getLanguages,
} from '../../actions';
import { QuestionTypes } from '../../Data';

import { Modal } from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class CreateQuestionForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.getLanguages();
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
        is_featured: myform.is_featured,
        options: myform.options,
        max_score: myform.max_score,
        pass_score: myform.pass_score,
        status: 'AC',
      },
    };

    this.props.save(question, programId, assessmentId);
  }

  render() {
    const { isOpen, canSubmit, languages } = this.props;
    const featuredValues = [
      {
        value: true,
        label: 'True',
      },
      {
        value: false,
        label: 'False',
      },
    ];

    return (
      <Modal
        title="Create Question"
        contentLabel="Create Question"
        onCloseModal={this.props.onCloseModal}
        isOpen={isOpen}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Save"
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
          <Input
            name="options"
            id="options"
            value=""
            label="Options"
            type="text"
            placeholder="Please enter the Options (example 0,1 or true,false etc)."
          />
          <Select
            name="is_featured"
            label="Is Featured"
            options={featuredValues}
            value="true"
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
          <Input
            name="max_score"
            id="max_score"
            value=""
            label="Max Score"
            type="text"
            placeholder="Enter Max score"
          />
          <Input
            name="pass_score"
            id="pass_score"
            value=""
            label="Pass Score"
            type="text"
            placeholder="Enter Pass score"
          />
          <Select name="lang_name" label="Language" options={languages} required />
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
  getLanguages: PropTypes.func,
  languages: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.modal.createQuestion,
    canSubmit: state.appstate.enableSubmitForm,
    assessmentId: Number(ownProps.assessmentId),
    languages: state.languages.languages,
  };
};

const CreateQuestion = connect(mapStateToProps, {
  save: createNewQuestion,
  enableSubmitForm,
  disableSubmitForm,
  onCloseModal: toggleCreateQuestionModal,
  getLanguages,
})(CreateQuestionForm);

export { CreateQuestion };
