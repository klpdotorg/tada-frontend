import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import _ from 'lodash';

import 'react-select/dist/react-select.css';
import { Modal } from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class CreateInstitutionForm extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();
    const institution = {
      name: myform.name,
      address: myform.institutionAddress,
      area: myform.institutionArea,
      landmark: myform.institutionLandmark,
      pincode: myform.institutionPincode,
      languages: myform.institutionLang,
      admin3: this.props.parent,
      gender: myform.institutionGender,
      category: myform.institutionCat,
      management: myform.institutionManagement,
      last_verified_year: myform.last_verified_year,
      status: 'AC',
      dise: myform.institutionDise_code,
    };

    const filterInstitution = _.reduce(
      institution,
      (soFar, value, key) => {
        if (value) {
          soFar[key] = value;
        }
        return soFar;
      },
      {},
    );

    this.props.save(filterInstitution);
  }

  render() {
    const {
      title,
      isOpen,
      placeHolder,
      languages,
      managements,
      institutionCategories,
      lastVerifiedYears,
    } = this.props;

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
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          <Input
            name="name"
            id="name"
            value=""
            label="School Name:"
            type="text"
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
            value={_.get(institutionCategories[0], 'value')}
            options={institutionCategories}
          />
          <Select
            multiple
            name="institutionLang"
            label="Medium:"
            value={[_.get(languages[0], 'value')]}
            options={languages}
            required
          />
          <Select
            name="institutionManagement"
            label="Management:"
            value={_.get(managements[0], 'value')}
            options={managements}
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
            required
          />
          <Select
            name="last_verified_year"
            label="Last Verified Year:"
            value={_.get(lastVerifiedYears[0], 'value')}
            options={lastVerifiedYears}
            required
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateInstitutionForm.propTypes = {
  parentNodeId: PropTypes.string,
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  parent: PropTypes.number,
  languages: PropTypes.array,
  managements: PropTypes.array,
  lastVerifiedYears: PropTypes.array,
  institutionCategories: PropTypes.array,
  save: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

export { CreateInstitutionForm };
