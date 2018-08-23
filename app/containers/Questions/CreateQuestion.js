import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

import {
  createNewQuestion,
  enableSubmitForm,
  disableSubmitForm,
  toggleCreateQuestionModal,
  getLanguages,
  fetchQuestionTypes,
} from '../../actions';

import { Modal } from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class CreateQuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledOptionsField: true,
      disabledScoreFields: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuestionTypes();
    this.props.getLanguages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      const Id = get(nextProps.types, '[0].id', '');
      this.handleTypeChange(null, Id);
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

  submitForm() {
    const { programId, assessmentId } = this.props;
    const myform = this.myform.getModel();
    const question = {
      question_details: {
        question_text: myform.qnText,
        display_text: myform.displayText,
        lang_name: myform.lang_name,
        key: myform.key,
        question_type_id: myform.type,
        is_featured: myform.is_featured,
        options: myform.options,
        max_score: myform.max_score || 0,
        pass_score: myform.pass_score,
        status: 'AC',
      },
      sequence: myform.order,
    };
    this.props.save(question, programId, assessmentId);
  }

  checkOptionPermission(value) {
    const Ids = [1, 2];
    if (Ids.includes(Number(value))) {
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

  handleTypeChange(field, value) {
    const newVal = this.checkOptionPermission(value);
    const scorePermission = this.checkScorePermission(value);
    this.setState({
      disabledOptionsField: newVal,
      disabledScoreFields: scorePermission,
    });
  }

  render() {
    const { disabledOptionsField, disabledScoreFields } = this.state;
    const { isOpen, canSubmit, error, order } = this.props;
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
            validationErrors={{
              minLength: 'Please provide at least 10 characters.',
            }}
            required
          />
          <Input
            name="lang_name"
            id="lang_name"
            value=""
            label="Question text in local language"
            type="text"
            validations="minLength:1"
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
          <Select
            name="is_featured"
            label="Is Featured"
            options={featuredValues}
            value="true"
            required
          />
          <Select
            name="type"
            label="Type"
            options={this.getQuestionTypes()}
            value={get(this.props.types, '[0].id', '')}
            required
            onChange={this.handleTypeChange}
          />
          <Input
            name="options"
            id="options"
            value=""
            label="Options"
            type="text"
            disabled={disabledOptionsField}
            placeholder="Please enter the Options (example 0,1 or true,false etc)."
          />
          <Input name="key" id="key" value="" label="Key" type="text" placeholder="Enter key" />
          <Input
            name="max_score"
            id="max_score"
            value=""
            label="Max Score"
            type="number"
            placeholder="Enter Max score"
            validations="isNumeric"
            disabled={disabledScoreFields}
            required={!disabledScoreFields}
          />
          <Input
            name="pass_score"
            id="pass_score"
            value=""
            label="Pass Score"
            type="number"
            placeholder="Enter Pass score"
            disabled={disabledScoreFields}
            required={!disabledScoreFields}
          />
          <Input
            name="order"
            id="order"
            value={order}
            label="Order"
            type="number"
            placeholder="Enter order"
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
  types: PropTypes.array,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  getLanguages: PropTypes.func,
  fetchQuestionTypes: PropTypes.func,
  error: PropTypes.object,
  order: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
  const keys = Object.values(state.questions.questions);

  return {
    isOpen: state.modal.createQuestion,
    canSubmit: state.appstate.enableSubmitForm,
    assessmentId: Number(ownProps.assessmentId),
    error: state.questions.error,
    types: state.questionTypes.types,
    order: keys.length + 1,
  };
};

const CreateQuestion = connect(mapStateToProps, {
  save: createNewQuestion,
  enableSubmitForm,
  disableSubmitForm,
  onCloseModal: toggleCreateQuestionModal,
  getLanguages,
  fetchQuestionTypes,
})(CreateQuestionForm);

export { CreateQuestion };
