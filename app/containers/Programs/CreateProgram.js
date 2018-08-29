import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

import { Modal } from '../../components/Modal';
import {
  saveNewProgram,
  enableSubmitForm,
  disableSubmitForm,
  toggleModal,
  fetchPartners,
} from '../../actions';
import { SurveyOns } from '../../Data';

const { Input, Select } = FRC;

class CreateProgramForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.getSurveyOns = this.getSurveyOns.bind(this);
  }

  componentDidMount() {
    this.props.fetchPartners();
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
      survey_on: myform.survey_on,
      partner: myform.partner,
      lang_name: myform.lang_name,
      admin0: this.props.parentId,
    };

    this.props.save(program);
  }

  render() {
    const { isOpen, canSubmit, error } = this.props;
    const partners = this.getPartners();

    return (
      <Modal
        title="Create Survey"
        contentLabel="Create Survey"
        isOpen={isOpen}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        onCloseModal={() => {
          this.props.toggleModal('createProgram');
        }}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Create"
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
            value=""
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
            value=""
            label="Name in local language"
            type="text"
          />
          <Input
            name="description"
            id="description"
            value=""
            label="Description"
            type="text"
            placeholder="Please enter the survey description (Optional)"
          />
          <Select
            name="partner"
            label="Partners"
            options={partners}
            value={get(partners, '[0].value', '')}
            required
          />
          <Select
            name="survey_on"
            label="Survey On Type"
            options={this.getSurveyOns()}
            value="institution"
            required
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateProgramForm.propTypes = {
  partners: PropTypes.array,
  fetchPartners: PropTypes.func,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  toggleModal: PropTypes.func,
  error: PropTypes.object,
  parentId: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { partners } = state.partners;
  return {
    isOpen: state.modal.createProgram,
    canSubmit: state.appstate.enableSubmitForm,
    error: state.programs.error,
    partners,
    parentId: state.profile.parentId,
  };
};

const CreateProgram = connect(mapStateToProps, {
  save: saveNewProgram,
  enableSubmitForm,
  disableSubmitForm,
  toggleModal,
  fetchPartners,
})(CreateProgramForm);

export { CreateProgram };
