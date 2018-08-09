import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import capitalize from 'lodash.capitalize';
import { DEFAULT_YEAR } from 'config';
import moment from 'moment';

import {
  saveNewAssessment,
  enableSubmitForm,
  disableSubmitForm,
  fetchRespondentTypes,
  fetchSources,
  toggleCreateAssessmentModal,
} from '../../actions';
import { Modal } from '../../components/Modal';
import { dateFormat } from '../../utils';
import { lastVerifiedYears } from '../../Data';

const { Input, Checkbox, Select } = FRC;

class CreateAssessmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRespondentTypes: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSources();
    this.props.fetchRespondentTypes();
  }

  setStartDate() {
    const formatteddate = dateFormat(new Date());
    return formatteddate;
  }

  setEndDate() {
    return moment()
      .add(1, 'year')
      .format('YYYY-MM-DD');
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
      academic_year: myform.academic_year_id,
      inst_type: myform.inst_type_id,
      source: myform.source_id,
      // survey_on: myform.type_id,
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
    const { isOpen, canSubmit, error } = this.props;
    const respondentTypes = this.filterRespondentTypes();
    const surveyTypes = [
      { value: 'institution', label: 'Institution' },
      { value: 'class', label: 'Class' },
      { value: 'student', label: 'Student' },
    ];
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
        title="Create QuestionGroup"
        contentLabel="Create QuestionGroup"
        isOpen={isOpen}
        onCloseModal={this.props.closeModal}
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
            name="lang_name"
            id="lang_name"
            value=""
            label="Name in local language"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="description"
            id="description"
            value=""
            label="Description"
            type="text"
            validations="minLength:1"
          />
          <Input
            name="group_text"
            id="group_text"
            value=""
            label="Group Text"
            type="text"
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
            name="endDate"
          />
          <Input
            name="version"
            id="version"
            value="1.0"
            label="Version"
            type="text"
            validations="minLength:1"
          />
          <Select
            name="type"
            label="Type"
            value={get(types[0], 'value')}
            options={types}
            required
          />
          <Select
            name="academic_year_id"
            label="Academic Year"
            value={DEFAULT_YEAR || get(lastVerifiedYears[0], 'value')}
            options={lastVerifiedYears}
          />
          <Select
            name="inst_type_id"
            label="Institution Type"
            value={get(institutionTypes[0], 'value')}
            options={institutionTypes}
            required
          />
          <Select
            name="source_id"
            label="Source"
            value={get(sources[0], 'value')}
            options={sources}
            required
          />
          {/* <Select
            name="type_id"
            label="Survey Type"
            value={get(surveyTypes[0], 'value')}
            options={surveyTypes}
            required
          /> */}
          <Checkbox
            label="Respondent Type Required"
            name="respondenttype_required"
            id="respondenttype_required"
            onChange={this.handleChange}
          />
          <Select
            name="default_respondent_type_id"
            label="Respondent Type"
            // value={get(respondentTypes[0], 'value')}
            options={respondentTypes}
            disabled={!showRespondentTypes}
          />
          <Checkbox label="Comments Required" name="comments_required" id="comments_required" />
          {/* <Checkbox label="Image Required" name="image_required" id="image_required" /> */}
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
  fetchSources: PropTypes.func,
  sources: PropTypes.array,
  error: PropTypes.object,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disabledSubmitForm: PropTypes.func,
  closeModal: PropTypes.func,
  fetchRespondentTypes: PropTypes.func,
  respondentTypes: PropTypes.array,
  programId: PropTypes.any,
};

const mapStateToProps = (state) => {
  const { sources } = state.sources;
  return {
    isOpen: state.modal.createAssessment,
    canSubmit: state.appstate.enableSubmitForm,
    programId: Number(state.programs.selectedProgram),
    error: state.assessments.error,
    respondentTypes: state.respondentTypes.types,
    sources,
  };
};

const CreateAssessment = connect(mapStateToProps, {
  save: saveNewAssessment,
  enableSubmitForm,
  disableSubmitForm,
  closeModal: toggleCreateAssessmentModal,
  fetchRespondentTypes,
  fetchSources,
})(CreateAssessmentForm);

export { CreateAssessment };
