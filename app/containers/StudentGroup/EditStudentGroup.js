import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';


import {
  deleteStudentGroup,
  saveStudentGroup,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal,
  closeConfirmModal,
  setParentNode,
} from '../../actions';

import ConfirmModal from '../../components/Modals/Confirm';

const { Input, Select } = FRC;

class EditStudentGroupForm extends Component {
  render() {
    const studentGroupTypes = [
      { label: 'Class', value: 'class' },
      { label: 'Center', value: 'Center' },
    ];

    const { canSubmit, openConfirmModal, studentGroup, hasStudents } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.saveStudentGroup}
        onValid={this.props.enableSubmitForm}
        onInvalid={this.props.disableSubmitForm}
        ref={ref => (this.myform = ref)}
      >
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="className"
              id="className"
              value={studentGroup.name}
              label="Class :"
              type="text"
              className="form-control"
              required
              validations="minLength:1"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              name="sectionName"
              id="sectionName"
              value={studentGroup.section}
              label="Section :"
              type="text"
              className="form-control"
              required
              validations="minLength:1"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Select
              name="groupType"
              label="Type:"
              value={studentGroup.group_type}
              options={studentGroupTypes}
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
            disabled={hasStudents}
            onClick={this.props.showConfirmModal}
          >
            Delete
          </button>
          <ConfirmModal
            isOpen={openConfirmModal}
            onAgree={this.deleteStudentGroup}
            onCloseModal={this.props.closeConfirmModal}
            entity={studentGroup.name}
          />
        </div>
      </Formsy.Form>
    );
  }
}


EditStudentGroupForm.propTypes = {
  canSubmit: PropTypes.bool,
  openConfirmModal: PropTypes.bool,
  institutionId: PropTypes.number,
  institutionNodeId: PropTypes.string,
  studentGroup: PropTypes.object,
  hasStudents: PropTypes.bool,
  saveStudentGroup: PropTypes.func,
  deleteStudentGroup: PropTypes.func,
  showConfirmModal: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
};


const mapStateToProps = (state, ownProps) => {
  const { studentGroupNodeId } = ownProps;
  const studentIds = state.boundaries.boundariesByParentId[studentGroupNodeId];
  const hasStudents = studentIds && studentIds.length > 0;

  return {
    hasStudents,
    openConfirmModal: state.appstate.confirmModal,
    studentGroup: state.boundaries.boundaryDetails[studentGroupNodeId],
    canSubmit: state.appstate.enableSubmitForm,
    institutionCategories: state.institution.institutionCats,
  };
};

const mapDispatchToProps = dispatch => ({
  saveStudentGroup: (institutionNodeId, studentGroup) => {
    dispatch(setParentNode(institutionNodeId));
    dispatch(saveStudentGroup(institutionNodeId, studentGroup));
  },
  deleteStudentGroup: (institutionId, studentGroupId) => {
    dispatch(deleteStudentGroup(institutionId, studentGroupId));
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

const EditStudentGroup = connect(mapStateToProps, mapDispatchToProps)(EditStudentGroupForm);

export { EditStudentGroup };
