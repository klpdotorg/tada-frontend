import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

import { Confirm } from '../Modal';
import {
  modifyBoundary,
  enableSubmitForm,
  disableSubmitForm,
  deleteBoundary,
  toggleCreateCircleModal,
  openDeleteBoundaryModal,
} from '../../actions';

const { Input } = FRC;

class EditProjectForm extends Component {
  constructor() {
    super();

    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  saveProject() {
    const myform = this.myform.getModel();
    this.props.saveProject(this.props.project.id, myform.ProjectName);
  }

  deleteProject() {
    const { projectNodeId, project, districtNodeId } = this.props;

    const params = {
      boundaryNodeId: projectNodeId,
      boundaryId: project.id,
      parentId: districtNodeId,
    };

    this.props.deleteProject(params);
  }

  render() {
    const { hasCircles, project, canSubmit } = this.props;

    return (
      <div>
        {hasCircles ? (
          <div className="alert alert-info">
            <i className="fa fa-info-circle fa-lg" aria-hidden="true" /> You cannot delete this
            boundary until its children are deleted
          </div>
        ) : (
          <div />
        )}
        <h4 className="text-primary col-md-10">Modify Details</h4>
        <button
          className="btn btn-green pull-right"
          title="Add Circle"
          onClick={this.props.toggleCircleModal}
        >
          Add Circle
        </button>
        <div className="base-spacing-mid border-base" />

        <Formsy.Form
          onValidSubmit={this.saveProject}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
        >
          <Input
            name="ProjectName"
            id="ProjectName"
            value={project.name}
            label="Project :"
            type="text"
            className="form-control"
            required
            validations="minLength:1"
          />
        </Formsy.Form>
        <div className="col-md-8">
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn btn-primary padded-btn"
            onClick={this.saveProject}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            onClick={() => {
              this.props.showConfirmModal(project.name);
            }}
          >
            Delete
          </button>
          <Confirm onYes={this.deleteProject} />
        </div>
      </div>
    );
  }
}

EditProjectForm.propTypes = {
  project: PropTypes.object,
  projectNodeId: PropTypes.string,
  districtNodeId: PropTypes.string,
  hasCircles: PropTypes.bool,
  canSubmit: PropTypes.bool,
  saveProject: PropTypes.func,
  toggleCircleModal: PropTypes.func,
  deleteProject: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  showConfirmModal: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { projectNodeId } = ownProps;
  const circleIds = state.boundaries.boundariesByParentId[projectNodeId];
  const hasCircles = circleIds && circleIds.length > 0;

  return {
    project: state.boundaries.boundaryDetails[projectNodeId] || {},
    hasCircles,
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
  };
};

const EditProject = connect(mapStateToProps, {
  toggleCircleModal: toggleCreateCircleModal,
  saveProject: modifyBoundary,
  deleteProject: deleteBoundary,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditProjectForm);

export { EditProject };
