import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import pickBy from 'lodash.pickby';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Loading } from '../../components/common';
import { Modal } from '../../components/Modal';
import { saveProgram, enableSubmitForm, disableSubmitForm } from '../../actions';
import { SurveyOns } from '../../Data';

const { Input } = FRC;

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

  submitForm() {
    const myform = this.myform.getModel();
    const program = {
      name: myform.programName,
      description: myform.description,
      status: 'AC',
    };
    // Save program
    this.props.save(pickBy(program));
  }

  render() {
    const { isOpen, canSubmit, program } = this.props;

    if (!program) {
      return (
        <div className="row text-center">
          <Loading />
        </div>
      );
    }

    return (
      <Modal
        title="Edit Program"
        contentLabel="Edit Program"
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
          <Input
            name="programName"
            id="programName"
            value={this.getValue(program.name)}
            label="Program"
            type="text"
            placeholder="Please enter the program name"
            help="This is a required field"
            required
            validations="minLength:1"
          />
          <Input
            name="description"
            id="description"
            value={this.getValue(program.description)}
            label="Description"
            type="text"
            placeholder="Please enter the program description (Optional)"
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
};

const mapStateToProps = (state) => {
  const { selectedProgram } = state.programs;

  return {
    isOpen: state.modal.editProgram,
    canSubmit: state.appstate.enableSubmitForm,
    program: get(state.programs.programs, selectedProgram),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (form) => {
      dispatch(saveProgram(form));
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
        modal: 'editProgram',
      });
    },
  };
};

const EditProgram = connect(mapStateToProps, mapDispatchToProps)(EditProgramForm);

export { EditProgram };
