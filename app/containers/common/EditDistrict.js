import React, { Component } from 'react';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

import { Confirm } from '../Modal';

const { Input } = FRC;

class EditDistrictForm extends Component {
  constructor() {
    super();

    this.saveDistrict = this.saveDistrict.bind(this);
    this.deleteDistrict = this.deleteDistrict.bind(this);
  }

  saveDistrict() {
    const myform = this.myform.getModel();
    this.props.saveDistrict(this.props.boundary.id, myform.DistrictName);
  }

  deleteDistrict() {
    const { districtNodeId, boundary, parentId } = this.props;

    const params = {
      boundaryNodeId: districtNodeId,
      boundaryId: boundary.id,
      parentId,
    };
    this.props.deleteDistrict(params);
  }

  render() {
    const { boundary, primary, canDelete, hasPermissions, error } = this.props;

    return (
      <div>
        {!hasPermissions ? (
          <div className="alert alert-danger">
            <i className="fa fa-lock fa-lg" aria-hidden="true" />
            Insufficient Privileges. Only administrators can modify boundary details.
          </div>
        ) : (
          <div />
        )}
        {hasPermissions && !canDelete ? (
          <div className="alert alert-info">
            <i className="fa fa-info-circle fa-lg" aria-hidden="true" /> You cannot delete this
            boundary until its children are deleted
          </div>
        ) : (
          <div />
        )}
        <h4 className="text-primary col-md-10">Modify Details</h4>
        {!primary ? (
          <button
            className="btn btn-green pull-right"
            title="Add Project"
            onClick={this.props.toggleProjectModal}
            disabled={!hasPermissions}
          >
            Add Project
          </button>
        ) : (
          <button
            className="btn btn-orange pull-right"
            title="Add Block"
            onClick={this.props.toggleBlockModal}
            disabled={!hasPermissions}
          >
            Add Block
          </button>
        )}
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.saveDistrict}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
          disabled={!hasPermissions}
        >
          <div className="base-spacing-sm" />
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
            name="DistrictName"
            id="DistrictName"
            value={boundary.name}
            type="text"
            label="District Name:"
            placeholder="Please enter the district name"
            className="form-control"
            required
            validations="minLength:1"
          />
        </Formsy.Form>
        <div className="col-md-8">
          <button
            type="button"
            disabled={!hasPermissions || !this.props.canSubmit}
            className="btn btn-primary padded-btn"
            onClick={this.saveDistrict}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            onClick={() => {
              this.props.showConfirmModal(boundary.name);
            }}
            disabled={!canDelete}
          >
            Delete
          </button>
          <Confirm onYes={this.deleteDistrict} />
        </div>
      </div>
    );
  }
}

EditDistrictForm.propTypes = {
  error: PropTypes.object,
  hasPermissions: PropTypes.bool,
  canSubmit: PropTypes.bool,
  boundary: PropTypes.object,
  canDelete: PropTypes.bool,
  toggleBlockModal: PropTypes.func,
  toggleProjectModal: PropTypes.func,
  districtNodeId: PropTypes.string,
  showConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  saveDistrict: PropTypes.func,
  deleteDistrict: PropTypes.func,
  primary: PropTypes.bool,
  parentId: PropTypes.string,
};

export { EditDistrictForm };
