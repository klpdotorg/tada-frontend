import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pickBy, get } from 'lodash';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../../components/Modal';
import { saveNewProgram, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input } = FRC;

class CreateProgramForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const program = {
      name: myform.programName,
      description: myform.description,
      status: 'AC',
    };
    this.props.save(pickBy(program));
  }

  render() {
    const { isOpen, canSubmit } = this.props;

    return (
      <Modal
        title="Create Program"
        contentLabel="Create Program"
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
          ref={(ref) => { return (this.myform = ref); }}
        >
          <Input
            name="programName"
            id="programName"
            value=""
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
            value=""
            label="Description"
            type="text"
            placeholder="Please enter the program description (Optional)"
          />
          {/* <Input
                      name="startDate"
                      id="startDate"
                      type="date"
                      label="Start Date"
                      value={this.setStartDate()}
                      placeholder="Please select the start date of the program"
                      required
                    />
                    <Input
                      name="endDate"
                      id="endDate"
                      type="date"
                      label="End Date"
                      value={this.setEndDate()}
                      placeholder="Please select the end date of the program"
                      required
                    />
                    <RadioGroup
                      name="programmeInstCat"
                      type="inline"
                      label="Institution Type"
                      help="Select institution type"
                      options={instType}
                      required
                    /> */}
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
