import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { saveNewQuestion, enableSubmitForm, disableSubmitForm } from '../../actions';

import { Modal } from '../../components/Modal';

const { Input, Textarea, Select, Row } = FRC;

class CreateQuestionForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.save(
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

  render() {
    const { isOpen, canSubmit } = this.props;

    const typeOptions = [{ value: '1', label: 'Marks' }, { value: '2', label: 'Grade' }];

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
          ref={(ref) => { return (this.myform = ref); }}
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
            // onChange={this.questionTypeChanged.bind(this)}
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
      </Modal>
    );
  }
}

CreateQuestionForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
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
    save: (form) => {
      dispatch(saveNewQuestion(form));
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
        modal: 'CreateQuestion',
      });
    },
  };
};

const CreateQuestion = connect(mapStateToProps, mapDispatchToProps)(CreateQuestionForm);

export { CreateQuestion };
