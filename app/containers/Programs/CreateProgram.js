import React, { Component } from 'react';
import { connect } from 'react-redux';
import pickBy from 'lodash.pickby';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { DEFAULT_PARENT_ID } from 'config';

import { Modal } from '../../components/Modal';
import { saveNewProgram, enableSubmitForm, disableSubmitForm } from '../../actions';
import { SurveyOns } from '../../Data';

const { Input, Select } = FRC;

class CreateProgramForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.getSurveyOns = this.getSurveyOns.bind(this);
  }

  getSurveyOns() {
    return SurveyOns.map((survey) => {
      return {
        value: survey.id,
        label: survey.label,
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
      admin0: DEFAULT_PARENT_ID,
    };
    this.props.save(pickBy(program));
  }

  render() {
    const { isOpen, canSubmit } = this.props;

    return (
      <Modal
        title="Create Survey"
        contentLabel="Create Survey"
        isOpen={isOpen}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        onCloseModal={this.props.closeConfirmModal}
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
          <Input
            name="programName"
            id="programName"
            value=""
            label="Survey"
            type="text"
            placeholder="Please enter the survey name"
            help="This is a required field"
            required
            validations="minLength:1"
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
            name="survey_on"
            label="Survey On"
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
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createProgram,
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form) => {
      dispatch(saveNewProgram(form));
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
        modal: 'createProgram',
      });
    },
  };
};

const CreateProgram = connect(mapStateToProps, mapDispatchToProps)(CreateProgramForm);

export { CreateProgram };
