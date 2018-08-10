import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { DEFAULT_PARENT_ID } from 'config';
import isEmpty from 'lodash.isempty';

import { Loading } from '../../components/common';
import { Modal } from '../../components/Modal';
import {
  saveProgram,
  enableSubmitForm,
  disableSubmitForm,
  toggleEditProgramModal,
} from '../../actions';
import { SurveyOns } from '../../Data';

const { Input, Select } = FRC;

class EditProgramForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  getValue(value) {
    return value || '';
  }

  getSurveyOns() {
    return SurveyOns.map((survey) => {
      return {
        value: survey.id,
        label: survey.label,
      };
    });
  }

  getPartners() {
    return this.props.partners.map((partner) => {
      return {
        value: partner.char_id,
        label: partner.name,
      };
    });
  }

  submitForm() {
    const myform = this.myform.getModel();
    const program = {
      name: myform.programName,
      description: myform.description,
      status: 'AC',
      partner: myform.partner,
      lang_name: myform.lang_name,
      admin0: DEFAULT_PARENT_ID,
    };
    // Save program
    this.props.save(program);
  }

  render() {
    const { isOpen, canSubmit, program, error } = this.props;
    const partners = this.getPartners();

    if (!program) {
      return (
        <div className="row text-center">
          <Loading />
        </div>
      );
    }

    return (
      <Modal
        title="Edit Survey"
        contentLabel="Edit Survey"
        isOpen={isOpen}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        onCloseModal={this.props.closeConfirmModal}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Save"
      >
        <Formsy.Form
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
          <Input
            name="programName"
            id="programName"
            value={this.getValue(program.name)}
            label="Name"
            type="text"
            placeholder="Please enter the survey name"
            help="This is a required field"
            required
            validations="minLength:1"
          />
          <Input
            name="lang_name"
            id="lang_name"
            value={this.getValue(program.lang_name)}
            label="Name in local language"
            type="text"
          />
          <Input
            name="description"
            id="description"
            value={this.getValue(program.description)}
            label="Description"
            type="text"
            placeholder="Please enter the survey description (Optional)"
          />
          <Select
            name="partner"
            label="Partners"
            options={partners}
            value={this.getValue(program.partner) || get(partners, '[0].value', '')}
            required
          />
          <Select
            name="survey_on"
            label="Survey On Type"
            options={this.getSurveyOns()}
            value={this.getValue(program.survey_on)}
            required
            disabled
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

EditProgramForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  program: PropTypes.object,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  partners: PropTypes.array,
  error: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { selectedProgram } = state.programs;
  const { partners } = state.partners;

  return {
    isOpen: state.modal.editProgram,
    canSubmit: state.appstate.enableSubmitForm,
    program: get(state.programs.programs, selectedProgram),
    partners,
    error: state.programs.error,
  };
};

const EditProgram = connect(mapStateToProps, {
  save: saveProgram,
  enableSubmitForm,
  disableSubmitForm,
  closeConfirmModal: toggleEditProgramModal,
})(EditProgramForm);

export { EditProgram };
