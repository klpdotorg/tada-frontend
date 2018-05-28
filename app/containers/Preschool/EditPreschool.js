import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import get from 'lodash.get';

import {
  deleteInstitution,
  modifyInstitution,
  enableSubmitForm,
  disableSubmitForm,
  openDeleteBoundaryModal,
} from '../../actions';
import { Confirm } from '../Modal';
import { hasChildren } from '../../utils';

const { Input, Textarea, Select } = FRC;

class EditPreschoolForm extends Component {
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
      name: myform.institutionName,
      address: myform.institutionAddress,
      area: myform.institutionArea,
      landmark: myform.institutionLandmark,
      pincode: myform.institutionPincode,
      cat: myform.institutionCat,
      languages: myform.institutionLang,
      mgmt: myform.institutionMgmt,
      id: this.props.institution.id,
    };

    this.props.save(this.props.institution.id, institution);
  }

  deleteInstitution() {
    const { institution, circleNodeId, institutionNodeId } = this.props;

    const params = {
      boundaryNodeId: institutionNodeId,
      boundaryId: institution.id,
      parentId: circleNodeId,
    };

    this.props.deleteInstitution(params);
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
      canDelete,
      languages,
      institutionCategories,
      managements,
    } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.saveInsti}
        onValid={this.props.enableSubmitForm}
        onInvalid={this.props.disableSubmitForm}
        ref={(ref) => {
          this.myform = ref;
        }}
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
              value={institution.dise}
              label="DISE Code:"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary padded-btn" disabled={!canSubmit}>
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            disabled={!canDelete}
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

EditPreschoolForm.propTypes = {
  canSubmit: PropTypes.bool,
  circleNodeId: PropTypes.string,
  institutionNodeId: PropTypes.string,
  institution: PropTypes.object,
  canDelete: PropTypes.bool,
  languages: PropTypes.array,
  managements: PropTypes.array,
  institutionCategories: PropTypes.array,
  save: PropTypes.func,
  deleteInstitution: PropTypes.func,
  showConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = state.profile;
  const { institutionNodeId } = ownProps;
  const { boundaries } = state;

  return {
    canDelete: isAdmin && hasChildren(institutionNodeId, boundaries),
    openConfirmModal: state.appstate.confirmModal,
    institution: get(boundaries.boundaryDetails, institutionNodeId, {}),
    canSubmit: state.appstate.enableSubmitForm,
    languages: state.languages.languages,
    managements: state.institution.managements,
    institutionCategories: state.institution.institutionCats,
  };
};

const EditPreschool = connect(mapStateToProps, {
  save: modifyInstitution,
  deleteInstitution,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditPreschoolForm);

export { EditPreschool };
