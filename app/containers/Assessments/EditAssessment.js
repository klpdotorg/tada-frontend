import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import capitalize from 'lodash.capitalize';

import {
  saveAssessment,
  enableSubmitForm,
  disableSubmitForm,
  toggleEditAssessmentModal,
} from '../../actions';
import { lastVerifiedYears } from '../../Data';
import { Modal } from '../../components/Modal';
import { dateFormat } from '../../utils';

const { Input, Checkbox, Select } = FRC;

class EditAssessmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRespondentTypes: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setStartDate() {
    const formatteddate = dateFormat(new Date());
    return formatteddate;
  }

  setEndDate() {
    const date = new Date();
    return dateFormat(date.setFullYear(date.getFullYear + 1));
  }

  getSources() {
    return this.props.sources.map((source) => {
      return {
        value: source.id,
        label: capitalize(source.name),
      };
    });
  }

  submitForm() {
    const myform = this.myform.getModel();
    const assessment = {
      name: myform.assessmentName,
      group_text: myform.group_text,
      start_date: myform.startDate,
      end_date: myform.endDate,
      version: myform.version,
      double_entry: myform.doubleEntry,
      academic_year: myform.academic_year,
      inst_type: myform.inst_type_id,
      source: myform.source_id,
      survey_on: myform.type_id,
      description: myform.description,
      lang_name: myform.lang_name,
      comments_required: myform.comments_required,
      image_required: myform.image_required,
      respondent_type_required: myform.respondent_type_required,
      respondent_type: myform.respondent_type,
      type: myform.type,
      survey: this.props.programId,
      status: 'AC',
    };

    this.props.save(assessment);
  }

  filterRespondentTypes() {
    return this.props.respondentTypes.map((type) => {
      return {
        value: type.char_id,
        label: type.name,
      };
    });
  }

  handleChange(field, value) {
    this.setState({
      showRespondentTypes: value,
    });
  }

  render() {
    const { showRespondentTypes } = this.state;
    const { isOpen, canSubmit, assessment } = this.props;
    const respondentTypes = this.filterRespondentTypes();
    // const surveyTypes = [
    //   { value: 'institution', label: 'Institution' },
    //   { value: 'class', label: 'Class' },
    //   { value: 'student', label: 'Student' },
    // ];
    const institutionTypes = [
      { value: 'primary', label: 'Primary School' },
      { value: 'pre', label: 'Pre School' },
    ];
    const types = [
      { value: 'assessment', label: 'Assessment' },
      { value: 'preception', label: 'Perception' },
      { value: 'monitor', label: 'Monitor' },
    ];
    const sources = this.getSources();

    return (
      <Modal
        title="Edit QuestionGroup"
        contentLabel="Edit QuestionGroup"
        isOpen={isOpen}
        onCloseModal={this.props.closeConfirmModal}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Save"
      >
        <Formsy.Form
          id="editAssessment"
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disabledSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          <Input
            name="assessmentName"
            id="assessmentName"
            value={assessment.name}
            label="Name"
            type="text"
            placeholder="Please enter the questiongroup name"
            help="This is a required field"
            required
            validations="minLength:1"
          />
          <Input
            name="lang_name"
            id="lang_name"
            value={assessment.lang_name}
            label="Name in local language"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="description"
            id="description"
            value={assessment.description}
            label="Description"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="group_text"
            id="group_text"
            value={assessment.group_text}
            label="Group Text"
            type="text"
            validations="minLength:1"
          />
          <Input
            type="date"
            label="Start Date"
            value={this.setStartDate(assessment.start_date)}
            name="startDate"
            help="Please select the start date of the questiongroup"
            required
            id="startDate"
          />
          <Input
            type="date"
            label="End Date"
            value={this.setEndDate(assessment.end_date)}
            help="Please select the end date of the questiongroup"
            name="endDate"
          />
          <Input
            name="version"
            id="version"
            value={assessment.version}
            label="Version"
            type="number"
          />
          <Select name="type" label="Type" value={assessment.type} options={types} required />
          <Select
            name="academic_year"
            label="Academic Year"
            value={assessment.academic_year || get(lastVerifiedYears, '[0].value', '')}
            options={lastVerifiedYears}
          />
          <Select
            name="inst_type_id"
            label="Institution Type"
            value={assessment.inst_type}
            options={institutionTypes}
            required
          />
          <Select
            name="source_id"
            label="Source"
            value={assessment.source || get(sources, '[0].value', '')}
            options={sources}
            required
          />
          <Checkbox
            label="Respondent Type Required"
            name="respondenttype_required"
            id="respondenttype_required"
            value={assessment.respondent_type_required}
            onChange={this.handleChange}
          />
          <Select
            name="default_respondent_type_id"
            label="Respondent Type"
            value={assessment.respondent_type}
            options={respondentTypes}
            disabled={!showRespondentTypes}
          />
          <Checkbox
            label="Comments Required"
            name="comments_required"
            id="comments_required"
            value={assessment.comment_required}
          />
          <Checkbox
            label="Image Required"
            name="image_required"
            id="image_required"
            value={assessment.image_required}
          />
          <Checkbox
            label="Double Entry"
            name="doubleEntry"
            id="doubleEntry"
            value={assessment.double_entry}
            help="Check this box if this questiongroup will need double entry"
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
  sources: PropTypes.array,
  respondentTypes: PropTypes.array,
};

const mapStateToProps = (state) => {
  const { editAssessmentId } = state.assessments;
  const { selectedProgram } = state.programs;
  const { sources } = state.sources;

  return {
    isOpen: state.modal.editAssessment,
    canSubmit: state.appstate.enableSubmitForm,
    programId: Number(selectedProgram),
    assessment: get(state.assessments.assessments, editAssessmentId, {}),
    respondentTypes: state.respondentTypes.types,
    sources,
  };
};

const EditAssessment = connect(mapStateToProps, {
  save: saveAssessment,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleEditAssessmentModal,
})(EditAssessmentForm);

export { EditAssessment };
