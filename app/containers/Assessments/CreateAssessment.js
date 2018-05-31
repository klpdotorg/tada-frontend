import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { saveNewAssessment, enableSubmitForm, disableSubmitForm } from '../../actions';

import { Modal } from '../../components/Modal';
import { dateFormat } from '../../utils';

const { Input, RadioGroup, Checkbox } = FRC;

class CreateAssessmentForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  setStartDate() {
    const formatteddate = dateFormat(new Date());
    return formatteddate;
  }

  setEndDate() {
    const date = new Date();
    return dateFormat(new Date(date.setFullYear(date.getFullYear() + 1)));
  }

  submitForm() {
    const myform = this.myform.getModel();
    const assessment = {
      name: myform.assessmentName,
      survey: this.props.programId,
      status: 'AC',
      inst_type: 'primary',
      start_date: myform.startDate,
      end_date: myform.endDate,
      type: 'monitor',
      survey_on: myform.type,
      double_entry: myform.doubleEntry,
    };

    this.props.save(assessment);
  }

  render() {
    const { isOpen, canSubmit } = this.props;

    const type = [
      { value: 'institution', label: 'Institution' },
      { value: 'class', label: 'Class' },
      { value: 'student', label: 'Student' },
    ];

    return (
      <Modal
        title="Create QuestionGroup"
        contentLabel="Create QuestionGroup"
        isOpen={isOpen}
        onCloseModal={this.props.closeConfirmModal}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Create"
      >
        <Formsy.Form
          id="createAssessment"
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disabledSubmitForm}
          ref={(ref) => {
            return (this.myform = ref);
          }}
        >
          <Input
            name="assessmentName"
            id="assessmentName"
            value=""
            label="Name"
            type="text"
            placeholder="Please enter the questiongroup name"
            help="This is a required field"
            required
            validations="minLength:1"
          />
          <Input
            type="date"
            label="Start Date"
            value={this.setStartDate()}
            name="startDate"
            help="Please select the start date of the questiongroup"
            required
            id="startDate"
          />
          <Input
            type="date"
            label="End Date"
            value={this.setEndDate()}
            help="Please select the end date of the questiongroup"
            required
            name="endDate"
          />
          <RadioGroup
            name="type"
            type="inline"
            label="Type"
            help="Select the type of this questiongroup"
            options={type}
            required
          />
          <Checkbox
            label="Double Entry"
            name="doubleEntry"
            id="doubleEntry"
            help="Check this box if this questiongroup will need double entry"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateAssessmentForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  programId: PropTypes.number,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disabledSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createAssessment,
    canSubmit: state.appstate.enableSubmitForm,
    programId: Number(state.programs.selectedProgram),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form) => {
      dispatch(saveNewAssessment(form));
    },
    enableSubmitForm: () => {
      dispatch(enableSubmitForm());
    },
    disableSubmitForm: () => {
      dispatch(disableSubmitForm());
    },
    closeConfirmModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createAssessment',
      });
    },
  };
};

const CreateAssessment = connect(mapStateToProps, mapDispatchToProps)(CreateAssessmentForm);

export { CreateAssessment };
