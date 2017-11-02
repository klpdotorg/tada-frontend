import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import {
  deleteInstitution,
  saveInstitution,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal,
  closeConfirmModal,
} from '../../actions';

import ConfirmModal from '../../components/Modals/Confirm';

const { Input, Textarea, Select } = FRC;

class EditInstitutionForm extends Component {
  constructor() {
    super();

    this.saveInsti = this.saveInsti.bind(this);
    this.deleteInstitution = this.deleteInstitution.bind(this);
  }

  saveInsti() {
    const myform = this.myform.getModel();
    const institution = {
      dise_code: myform.institutionDise_code,
      institution_gender: myform.institutionGender,
      name: myform.name,
      address: myform.institutionAddress,
      area: myform.institutionArea,
      landmark: myform.institutionLandmark,
      pincode: myform.institutionPincode,
      cat: myform.institutionCat,
      languages: myform.institutionLang,
      mgmt: myform.institutionMgmt,
      id: this.props.institution.id,
    };

    this.props.saveInstitution(institution);
  }

  deleteInstitution() {
    this.props.deleteInstitution(Number(this.props.clusterId), Number(this.props.institution.id));
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
      openConfirmModal,
    } = this.props;
    return (
      <Formsy.Form
        onValidSubmit={this.saveInsti}
        onValid={this.props.enableSubmitForm}
        onInvalid={this.props.disableSubmitForm}
        ref={ref => (this.myform = ref)}
      >
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="institutionName"
              id="institutionName"
              value={institution.name}
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
              value={institution.address}
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
              value={institution.area}
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
              value={institution.landmark}
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
              value={institution.pincode}
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
              value={institution.category}
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
              value={institution.languages}
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
              value={institution.institution_gender}
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
              value={institution.mgmt}
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
              value={institution.dise_code}
              label="DISE Code:"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-12">
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            disabled={!canSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            disabled={hasClasses}
            onClick={this.props.showConfirmModal}
          >
            Delete
          </button>
          <ConfirmModal
            isOpen={openConfirmModal}
            onAgree={this.deleteInstitution}
            onCloseModal={this.props.closeConfirmModal}
            entity={institution.name}
          />
        </div>
      </Formsy.Form>
    );
  }
}

EditInstitutionForm.propTypes = {
  canSubmit: PropTypes.bool,
  openConfirmModal: PropTypes.bool,
  clusterId: PropTypes.number,
  institution: PropTypes.object,
  hasClasses: PropTypes.bool,
  languages: PropTypes.array,
  managements: PropTypes.array,
  institutionCategories: PropTypes.array,
  saveInstitution: PropTypes.func,
  deleteInstitution: PropTypes.func,
  showConfirmModal: PropTypes.func,
  closeConfirmModal: PropTypes.func,
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
    languages: state.institution.languages,
    managements: state.institution.managements,
    institutionCategories: state.institution.institutionCats,
  };
};

const mapDispatchToProps = dispatch => ({
  saveInstitution: institution => {
    dispatch(saveInstitution(institution));
  },
  deleteInstitution: (clusterId, institutionId) => {
    dispatch(deleteInstitution(clusterId, institutionId));
  },
  enableSubmitForm: () => {
    dispatch(enableSubmitForm());
  },
  disableSubmitForm: () => {
    dispatch(disableSubmitForm());
  },
  showConfirmModal: () => {
    dispatch(showConfirmModal());
  },
  closeConfirmModal: () => {
    dispatch(closeConfirmModal());
  },
});

const EditInstitution = connect(mapStateToProps, mapDispatchToProps)(EditInstitutionForm);

export { EditInstitution };
