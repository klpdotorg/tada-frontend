import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import _ from 'lodash';

import 'react-select/dist/react-select.css';
import { Modal } from '../../components/Modal';
import {
  saveNewInstitution,
  enableSubmitForm,
  disableSubmitForm,
} from '../../actions';

const { Input, Textarea, Select } = FRC;

class CreateInstitutionForm extends Component {

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const copy = {
      dise: 599419,
      name: myform.name,
      address: myform.institutionAddress,
      // area: myform.institutionArea,
      // landmark: myform.institutionLandmark,
      // pincode: myform.institutionPincode,
      languages: 'hin' || myform.languages,
      admin3: this.props.parent,
      gender: myform.institutionGender,
      category: '10',
      management: '1',
      status: 'AC',
    };

    this.props.save(copy);
  }

  render() {
    const { title, isOpen, placeHolder, languages, institutionCategories } = this.props;

    const selectOptions = [
      { value: 'co-ed', label: 'Co-Ed' },
      { value: 'boys', label: 'Boys' },
      { value: 'girls', label: 'Girls' },
    ];

    return (
      <Modal
        title={title}
        contentLabel={title}
        isOpen={isOpen}
        onCloseModal={this.props.closeConfirmModal}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={ref => (this.myform = ref)}
        >
          <Input
            name="name"
            id="name"
            value=""
            label="School Name:"
            type="text"
            value=""
            placeholder={placeHolder}
            required
            validations="minLength:1"
          />
          <Textarea
            rows={3}
            cols={40}
            name="institutionAddress"
            label="Address :"
            value=""
            required
            validations="minLength:1"
          />
          <Input
            name="institutionArea"
            id="institutionArea"
            label="Area:"
            type="text"
            value=""
            className="form-control"
          />
          <Input
            name="institutionLandmark"
            id="institutionLandmark"
            label="Landmark:"
            type="text"
            value=""
            className="form-control"
          />
          <Input
            name="institutionPincode"
            id="institutionPincode"
            label="Pincode:"
            type="text"
            value=""
            className="form-control"
          />
          <Select
            name="institutionCat"
            label="Category:"
            value={_.get(institutionCategories, 'list[0].value')}
            options={institutionCategories}
          />
          <Select
            multiple
            name="institutionLang"
            label="Medium:"
            value={[_.get(languages, 'list[0].value')]}
            options={languages}
            required
          />
          <Select
            name="institutionGender"
            label="Gender:"
            value={_.get(selectOptions, '[0].value')}
            options={selectOptions}
            required
          />
          <Input
            name="institutionDise_code"
            id="institutionDise_code"
            value=""
            label="DISE Code:"
            type="text"
            className="form-control"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateInstitutionForm.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  parent: PropTypes.number,
  languages: PropTypes.array,
  institutionCategories: PropTypes.array,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  title: 'Create New Institution',
  isOpen: state.modal.createInstitution,
  canSubmit: state.appstate.enableSubmitForm,
  languages: state.institution.languages,
  mgmt: state.institution.mgmt,
  institutionCategories: state.institution.institutionCats,
});

const mapDispatchToProps = dispatch => ({
  save: (form) => {
    console.log(form);
    dispatch(saveNewInstitution(form));
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
      modal: 'createInstitution',
    });
  },
});

const CreateInstitution = connect(mapStateToProps, mapDispatchToProps)(CreateInstitutionForm);

export { CreateInstitution };
