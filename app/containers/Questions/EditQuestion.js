import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import isEmpty from 'lodash.isempty';

import {
  saveQuestion,
  enableSubmitForm,
  disableSubmitForm,
  toggleEditQuestionModal,
} from '../../actions';

import { Modal } from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class EditQuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledOptionsField: false,
      disabledScoreFields: false,
      options: null,
    };

    this.submitForm = this.submitForm.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    // this.disabledOptions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question !== this.props.question) {
      this.disabledOptions(nextProps);
    }
  }
  getQuestionTypes() {
    return this.props.types.map((type) => {
      return {
        value: type.id,
        label: `${type.display} (${type.type})`,
      };
    });
  }

  getQuestionTypeId(typeText) {
    return this.props.types.find((type) => {
      return type.display === typeText;
    });
  }

  getValue(field) {
    return get(this.props.question, field, '');
  }

  disabledOptions(nextProps) {
    const newVal = this.checkOptionPermission(nextProps.question.question_type_id);
    const scorePermission = this.checkScorePermission(nextProps.question.question_type_id);
    this.setState({
      disabledOptionsField: newVal,
      disabledScoreFields: scorePermission,
    });
  }

  checkOptionPermission(value) {
    if (Number(value) === 2 || Number(value) === 1) {
      return false;
    }

    return true;
  }

  checkScorePermission(value) {
    if (Number(value) === 3) {
      return false;
    }

    return true;
  }

  emptyOptions(value) {
    if (Number(value) === 3 || Number(value) === 4) {
      return false;
    }

    return true;
  }

  handleTypeChange(field, value) {
    const newVal = this.checkOptionPermission(value);
    const scorePermission = this.checkScorePermission(value);
    const emtpy = this.emptyOptions(value);

    if (emtpy) {
      this.setState({
        options: this.getValue('options'),
      });
    } else {
      this.setState({
        options: null,
      });
    }

    this.setState({
      disabledOptionsField: newVal,
      disabledScoreFields: scorePermission,
    });
  }

  submitForm() {
    const { programId, assessmentId, questionId } = this.props;
    const myform = this.myform.getModel();
    const question = {
      question_text: myform.qnText,
      display_text: myform.displayText,
      lang_name: myform.lang_name,
      key: myform.key,
      question_type_id: myform.type,
      is_featured: myform.is_featured,
      options: myform.options,
      max_score: myform.max_score,
      pass_score: myform.pass_score,
      status: 'AC',
    };

    this.props.save(question, programId, assessmentId, questionId);
  }

  render() {
    const { disabledOptionsField, disabledScoreFields } = this.state;
    const { isOpen, canSubmit, error } = this.props;
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
    const options = this.state.options || this.getValue('options') || [];
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
          id="editQuestion"
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          {!isEmpty(error) ? (
            <div className="alert alert-danger">
              {Object.keys(error).map((key) => {
                const value = error[key];
                return (
                  <p key={key}>
                    <strong>{key}:</strong> {value[0]}
                  </p>
                );
              })}
            </div>
          ) : (
            <span />
          )}
          <Textarea
            rows={2}
            cols={60}
            name="qnText"
            label="Question Text"
            placeholder="Please enter the question text"
            validations="minLength:10"
            value={this.getValue('question_text')}
            validationErrors={{
              minLength: 'Please provide at least 10 characters.',
            }}
            required
          />
          <Input
            name="lang_name"
            id="lang_name"
            value={this.getValue('lang_name')}
            label="Question text in local language"
            type="text"
            validations="minLength:1"
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
            name="is_featured"
            label="Is Featured"
            options={featuredValues}
            value={this.getValue('is_featured')}
            required
          />
          <Select
            name="type"
            label="Type"
            options={this.getQuestionTypes()}
            value={this.getValue('question_type_id')}
            required
            onChange={this.handleTypeChange}
          />
          <Input
            name="options"
            id="options"
            value={options.join(', ')}
            label="Options"
            type="text"
            disabled={disabledOptionsField}
            placeholder="Please enter the Options (example 0,1 or true,false etc)."
          />
          <Input
            name="key"
            id="key"
            value={this.getValue('key')}
            label="Key"
            type="text"
            placeholder="Enter key"
          />
          <Input
            name="max_score"
            id="max_score"
            value={this.getValue('max_score')}
            label="Max Score"
            type="text"
            placeholder="Enter Max score"
            disabled={disabledScoreFields}
            required={!disabledScoreFields}
          />
          <Input
            name="pass_score"
            id="pass_score"
            value={this.getValue('pass_score')}
            label="Pass Score"
            type="text"
            placeholder="Enter Pass score"
            disabled={disabledScoreFields}
            required={!disabledScoreFields}
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditQuestionForm.propTypes = {
  isOpen: PropTypes.bool,
  types: PropTypes.array,
  canSubmit: PropTypes.bool,
  programId: PropTypes.number,
  assessmentId: PropTypes.number,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  question: PropTypes.object,
  questionId: PropTypes.any,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { editQuestion, questions, error } = state.questions;

  return {
    isOpen: state.modal.editQuestion,
    canSubmit: state.appstate.enableSubmitForm,
    assessmentId: Number(ownProps.assessmentId),
    question: get(questions, editQuestion),
    questionId: editQuestion,
    error,
    types: state.questionTypes.types,
  };
};

const EditQuestion = connect(mapStateToProps, {
  save: saveQuestion,
  enableSubmitForm,
  disableSubmitForm,
  onCloseModal: toggleEditQuestionModal,
})(EditQuestionForm);

export { EditQuestion };
