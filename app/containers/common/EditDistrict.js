import React, { Component } from 'react';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { DEFAULT_PARENT_NODE_ID } from 'config';

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
    const { districtNodeId, boundary } = this.props;

    const params = {
      boundaryNodeId: districtNodeId,
      boundaryId: boundary.id,
      parentId: DEFAULT_PARENT_NODE_ID,
    };
    this.props.deleteDistrict(params);
  }

  render() {
    const { boundary, primary, canDelete } = this.props;

    return (
      <div>
        {!canDelete ? (
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
          >
            Add Project
          </button>
        ) : (
          <button
            className="btn btn-orange pull-right"
            title="Add Block"
            onClick={this.props.toggleBlockModal}
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
        >
          <div className="base-spacing-sm" />
          <Input
            name="DistrictName"
            id="DistrictName"
            value={boundary.name}
            type="text"
            label="District Name:"
            placeholder="Please enter the district name"
            className="form-control"
            required
            validations={{
              textValidation(values, value) {
                return value.match(/^[a-zA-Z0-9 ]*$/g) ? true : 'Please enter text only';
              },
            }}
          />
        </Formsy.Form>
        <div className="col-md-8">
          <button
            type="button"
            disabled={!this.props.canSubmit}
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
};

export { EditDistrictForm };
