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

    this.saveCluster = this.saveCluster.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
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
      id: this.props.institutionId,
    };

    this.props.saveInstitution(institution);
  }

  deleteCluster() {
    this.props.deleteInstitution(Number(this.props.clusterId), Number(this.props.institutionId));
  }

  render() {
    const selectOptions = [
      { value: 'co-ed', label: 'Co-Ed' },
      { value: 'boys', label: 'Boys' },
      { value: 'girls', label: 'Girls' },
    ];

    const singleSelectOptions = [{ value: '', label: 'Please select…' }, ...selectOptions];
    const {
      canModify,
      institution,
      hasClasses,
      languages,
      institutionCategories,
      mgmt,
      openConfirmModal,
    } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.saveInsti}
        onValid={this.props.enableSubmitForm}
        onInvalid={this.props.disableSubmitForm}
        disabled={!canModify}
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
              value={institution.cat}
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
              options={mgmt}
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

        {!canModify
          ? <div />
          : <div className="col-md-12">
              <button type="submit" className="btn btn-primary padded-btn">
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
            </div>}
      </Formsy.Form>
    );
  }
}

EditInstitutionForm.propTypes = {
  canModify: PropTypes.bool,
  openConfirmModal: PropTypes.bool,
  institutionId: PropTypes.string,
  clusterId: PropTypes.string,
  institution: PropTypes.object,
  hasClasses: PropTypes.object,
  languages: PropTypes.array,
  mgmt: PropTypes.array,
  institutionCategories: PropTypes.array,
  saveInstitution: PropTypes.func,
  deleteInstitution: PropTypes.func,
  showConfirmModal: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = state => {
  const { institutionId } = this.props;
  const classesIds = state.boundaries.boundariesByParentId[institutionId];
  const hasClasses = classesIds && classesIds.length > 0;

  return {
    hasClasses,
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.institution.languages,
    mgmt: state.institution.mgmt,
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
