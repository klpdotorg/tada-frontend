import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import {
  deleteStudentGroup,
  modifyStudentGroup,
  enableSubmitForm,
  disableSubmitForm,
  openDeleteBoundaryModal,
} from '../../actions';

import { Confirm } from '../Modal';

const { Input, Select } = FRC;

class EditStudentGroupForm extends Component {
  constructor(props) {
    super(props);

    this.saveStudentGroup = this.saveStudentGroup.bind(this);
    this.deleteStudentGroup = this.deleteStudentGroup.bind(this);
  }

  saveStudentGroup() {
    const myform = this.myform.getModel();

    const studentGroup = {
      name: myform.className,
      section: myform.sectionName,
      group_type: myform.groupType,
    };

    this.props.saveStudentGroup(studentGroup, this.props.studentGroup.id);
  }

  deleteStudentGroup() {
    console.log('Delete student group');
  }

  render() {
    const studentGroupTypes = [
      { label: 'Class', value: 'class' },
      { label: 'Center', value: 'center' },
    ];

    const { studentGroup, hasStudents } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.saveStudentGroup}
        onValid={this.props.enableSubmitForm}
        onInvalid={this.props.disableSubmitForm}
        ref={(ref) => { return (this.myform = ref); }}
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
            onClick={this.saveStudentGroup}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            disabled={hasStudents}
            onClick={() => {
              this.props.showConfirmModal(studentGroup.name);
            }}
          >
            Delete
          </button>
          <Confirm onYes={this.deleteStudentGroup} />
        </div>
      </Formsy.Form>
    );
  }
}

EditStudentGroupForm.propTypes = {
  studentGroup: PropTypes.object,
  hasStudents: PropTypes.bool,
  saveStudentGroup: PropTypes.func,
  showConfirmModal: PropTypes.func,
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

const EditStudentGroup = connect(mapStateToProps, {
  saveStudentGroup: modifyStudentGroup,
  deleteStudentGroup,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditStudentGroupForm);

export { EditStudentGroup };
