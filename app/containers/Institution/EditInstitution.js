import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import {
  deleteInstitution,
  modifyInstitution,
  enableSubmitForm,
  disableSubmitForm,
  openDeleteBoundaryModal,
} from '../../actions';

import { Confirm } from '../Modal';

const { Input, Textarea, Select } = FRC;

class EditInstitutionForm extends Component {
  constructor() {
    super();

    this.saveInsti = this.saveInsti.bind(this);
    this.deleteInstitution = this.deleteInstitution.bind(this);
  }

  getValue(value) {
    return value || '';
  }

  deleteInstitution() {
    this.props.deleteInstitution(Number(this.props.clusterId), Number(this.props.institution.id));
  }

  saveInsti() {
    const myform = this.myform.getModel();
    const institution = {
      dise: myform.institutionDise_code,
      gender: myform.institutionGender,
      name: myform.institutionName,
      address: myform.institutionAddress,
      area: myform.institutionArea,
      landmark: myform.institutionLandmark,
      pincode: myform.institutionPincode,
      category: myform.institutionCat,
      languages: myform.institutionLang,
      management: myform.institutionMgmt,
      last_verified_year: myform.lastVerifiedYear,
    };

    this.props.save(this.props.institution.id, institution);
  }

  render() {
    const selectOptions = [
      { value: 'co-ed', label: 'Co-Ed' },
      { value: 'boys', label: 'Boys' },
      { value: 'girls', label: 'Girls' },
    ];

    const singleSelectOptions = [{ value: '', label: 'Please select…' }, ...selectOptions];
    const {
      institution,
      canSubmit,
      hasClasses,
      languages,
      institutionCategories,
      managements,
      lastVerifiedYears,
    } = this.props;
    return (
      <Formsy.Form
        onValidSubmit={this.saveInsti}
        onValid={this.props.enableSubmitForm}
        onInvalid={this.props.disableSubmitForm}
        ref={(ref) => {
          return (this.myform = ref);
        }}
        canSubmit={canSubmit}
      >
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="institutionName"
              id="institutionName"
              value={this.getValue(institution.name)}
              label="Institution :"
              type="text"
              className="form-control"
              required
              validations="minLength:1"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Textarea
              rows={3}
              cols={40}
              name="institutionAddress"
              label="Address :"
              value={this.getValue(institution.address)}
              required
              validations="minLength:1"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="institutionArea"
              id="institutionArea"
              value={this.getValue(institution.area)}
              label="Area:"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="institutionLandmark"
              id="institutionLandmark"
              value={this.getValue(institution.landmark)}
              label="Landmark:"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="institutionPincode"
              id="institutionPincode"
              value={this.getValue(institution.pincode)}
              label="Pincode:"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Select
              name="institutionCat"
              label="Category:"
              value={this.getValue(institution.category)}
              options={institutionCategories}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Select
              multiple
              name="institutionLang"
              label="Medium:"
              value={this.getValue(institution.languages)}
              options={languages}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Select
              name="institutionGender"
              label="Gender:"
              value={this.getValue(institution.gender)}
              options={singleSelectOptions}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Select
              name="institutionMgmt"
              label="Management:"
              value={this.getValue(institution.management)}
              options={managements}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="institutionDise_code"
              id="institutionDise_code"
              value={this.getValue(institution.dise_code)}
              label="DISE Code:"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Select
              name="lastVerifiedYear"
              label="Last Verified Year:"
              value={this.getValue(institution.last_verified_year)}
              options={lastVerifiedYears}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary padded-btn">
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            disabled={hasClasses}
            onClick={() => {
              this.props.showConfirmModal(institution.name);
            }}
          >
            Delete
          </button>
          <Confirm onYes={this.deleteInstitution} />
        </div>
      </Formsy.Form>
    );
  }
}

EditInstitutionForm.propTypes = {
  canSubmit: PropTypes.bool,
  clusterId: PropTypes.number,
  institution: PropTypes.object,
  hasClasses: PropTypes.bool,
  languages: PropTypes.array,
  managements: PropTypes.array,
  lastVerifiedYears: PropTypes.array,
  institutionCategories: PropTypes.array,
  save: PropTypes.func,
  deleteInstitution: PropTypes.func,
  showConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { institutionNodeId } = ownProps;
  const classesIds = state.boundaries.boundariesByParentId[institutionNodeId];
  const hasClasses = classesIds && classesIds.length > 0;

  return {
    hasClasses,
    openConfirmModal: state.appstate.confirmModal,
    institution: state.boundaries.boundaryDetails[institutionNodeId],
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.languages.languages,
    managements: state.institution.managements,
    institutionCategories: state.institution.institutionCats,
    lastVerifiedYears: state.institution.lastVerifiedYears,
  };
};

const EditInstitution = connect(mapStateToProps, {
  save: modifyInstitution,
  deleteInstitution,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditInstitutionForm);

export { EditInstitution };
