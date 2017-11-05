import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from '../../components/Modal';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { openNode, saveNewClass, enableSubmitForm, disableSubmitForm } from '../../actions';

const { Input, Select } = FRC;

class CreateClassForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const studentGroup = {
      name: myform.class,
      section: myform.section,
      group_type: myform.role,
      status: 'AC',
      institution: this.props.institutionId,
    };

    this.props.save(studentGroup, this.props.institutionNodeId);
  }

  render() {
    const { isOpen, canSubmit } = this.props;
    const role = [{ value: 'Class', label: 'Class' }, { value: 'Center', label: 'Center' }];

    return (
      <Modal
        title="Create Class"
        contentLabel="Create Class"
        isOpen={isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={ref => {
            this.myform = ref;
          }}
        >
          <Input
            name="class"
            id="class"
            value=""
            label="Class"
            type="text"
            placeholder="Please enter the class/grade"
            help="This is a required field"
            validations="minLength:1"
            required
          />
          <Input
            name="section"
            id="section"
            value=""
            label="Section"
            type="text"
            placeholder="Please enter the section"
            validations="isAlphanumeric,minLength:1"
          />
          <Select name="group_type" label="Type" options={role} value="Class" required />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateClassForm.propTypes = {
  institutionNodeId: PropTypes.string,
  institutionId: PropTypes.number,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  onCloseModal: PropTypes.func,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.modal.createClass,
  canSubmit: state.appstate.enableSubmitForm,
});

const mapDispatchToProps = dispatch => ({
  save: (form, institutionNodeId) => {
    dispatch(openNode(institutionNodeId));
    dispatch(saveNewClass(form));
  },
  enableSubmitForm: () => {
    dispatch(enableSubmitForm());
  },
  disableSubmitForm: () => {
    dispatch(disableSubmitForm());
  },
  onCloseModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createClass',
    });
  },
});

const CreateClass = connect(mapStateToProps, mapDispatchToProps)(CreateClassForm);

export { CreateClass };
