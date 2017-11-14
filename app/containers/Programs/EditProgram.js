import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, pickBy } from 'lodash';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Loading } from '../../components/common';
import { Modal } from '../../components/Modal';
import { saveProgram, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input } = FRC;

class EditProgramForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  getValue(value) {
    return value || '';
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
          ref={(ref) => { return (this.myform = ref); }}
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
          {/* <Input
                      name="startDate"
                      id="startDate"
                      type="date"
                      label="Start Date"
                      value={this.getValue(program.start_date)}
                      placeholder="Please select the start date of the program"
                      required
                    />
                    <Input
                      name="endDate"
                      id="endDate"
                      type="date"
                      label="End Date"
                      value={this.getValue(program.end_date)}
                      placeholder="Please select the end date of the program"
                      required
                    />
                    <RadioGroup
                      name="programmeInstCat"
                      type="inline"
                      label="Institution Type"
                      value={this.getValue(program.inst_type)}
                      help="Select institution type"
                      options={instType}
                      required
                    /> */}
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
