import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import isEmpty from 'lodash.isempty';

import { Modal } from '../../components/Modal';
import { toggleClassModal, saveNewClass, enableSubmitForm, disableSubmitForm } from '../../actions';

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
      group_type: myform.group_type,
      status: 'AC',
      institution: this.props.institutionId,
    };

    this.props.save(studentGroup);
  }

  render() {
    const { isOpen, canSubmit, error } = this.props;
    const role = [{ value: 'class', label: 'Class' }, { value: 'center', label: 'Center' }];

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
            name="class"
            id="class"
            value=""
            label="Class"
            type="number"
            placeholder="Please enter the class/grade"
            help="This is a required field"
            validations={{
              isNumeric: true,
              myCustomIsFiveValidation: (values, value) => {
                return value > 0 && value < 10 ? true : '';
              },
            }}
            required
          />
          <Input
            name="section"
            id="section"
            value=""
            label="Section"
            type="text"
            placeholder="Please enter the section"
            validations="isWords,minLength:1"
          />
          <Select name="group_type" label="Type" options={role} value="class" required />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateClassForm.propTypes = {
  error: PropTypes.object,
  institutionId: PropTypes.number,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  onCloseModal: PropTypes.func,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.createClass,
    canSubmit: state.appstate.enableSubmitForm,
    error: state.boundaries.createError,
  };
};

const CreateClass = connect(mapStateToProps, {
  save: saveNewClass,
  enableSubmitForm,
  disableSubmitForm,
  onCloseModal: toggleClassModal,
})(CreateClassForm);

export { CreateClass };
