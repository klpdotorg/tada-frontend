import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import Formsy from 'formsy-react';
import moment from 'moment';
import FRC from 'formsy-react-components';
import { saveAssessment, enableSubmitForm, disableSubmitForm } from '../../actions';

import { Modal } from '../../components/Modal';

const { Input, RadioGroup, Checkbox } = FRC;

class EditAssessmentForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  setStartDate() {
    const formatteddate = moment().format('YYYY-MM-DD');
    return formatteddate;
  }

  setEndDate() {
    return moment()
      .add(1, 'years')
      .format('YYYY-MM-DD');
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
    const { isOpen, canSubmit, assessment } = this.props;

    const type = [
      { value: 'institution', label: 'Institution' },
      { value: 'class', label: 'Class' },
      { value: 'student', label: 'Student' },
    ];

    return (
      <Modal
        title="Create Assessment"
        contentLabel="Create Assessment"
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
          ref={(ref) => { return (this.myform = ref); }}
        >
          <Input
            name="assessmentName"
            id="assessmentName"
            value={assessment.name}
            label="Name"
            type="text"
            placeholder="Please enter the assessment name"
            help="This is a required field"
            required
            validations="minLength:1"
          />
          <Input
            type="date"
            label="Start Date"
            value={assessment.start_date}
            name="startDate"
            help="Please select the start date of the assessment"
            required
            id="startDate"
          />
          <Input
            type="date"
            label="End Date"
            value={assessment.end_date}
            help="Please select the end date of the assessment"
            required
            name="endDate"
          />
          <RadioGroup
            name="type"
            type="inline"
            label="Type"
            value={assessment.survey_on}
            help="Select the type of this assessment"
            options={type}
            required
          />
          <Checkbox
            label="Double Entry"
            name="doubleEntry"
            id="doubleEntry"
            value={assessment.double_entry}
            help="Check this box if this assessment will need double entry"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditAssessmentForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  programId: PropTypes.number,
  assessment: PropTypes.object,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disabledSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { editAssessmentId } = state.assessments;
  const { selectedProgram } = state.programs;

  return {
    isOpen: state.modal.editAssessment,
    canSubmit: state.appstate.enableSubmitForm,
    programId: Number(selectedProgram),
    assessment: get(state.assessments.assessments, `[${selectedProgram}][${editAssessmentId}]`, {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form) => {
      dispatch(saveAssessment(form));
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
        modal: 'editAssessment',
      });
    },
  };
};

const EditAssessment = connect(mapStateToProps, mapDispatchToProps)(EditAssessmentForm);

export { EditAssessment };
