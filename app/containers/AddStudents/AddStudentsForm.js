import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash.map';
import isEmpty from 'lodash.isempty';
import uniq from 'lodash.uniq';
import includes from 'lodash.includes';
import get from 'lodash.get';

import { AddStudentInputRow } from './index';
import { goback, setAddStudentsFormErrors, addStudents } from '../../actions';

const REQUIRED_FIELDS = [
  {
    value: 'first_name',
    label: 'First Name',
  },
  {
    value: 'dob',
    label: 'Date of Birth',
  },
  {
    value: 'gender',
    label: 'Gender',
  },
];

class AddStudentsFormView extends Component {
  constructor() {
    super();

    this.renderErrors = this.renderErrors.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.validate = this.validate.bind(this);
  }

  setRequiredField(field) {
    let required = '';

    map(REQUIRED_FIELDS, (requiredField) => {
      if (includes(requiredField.value, field)) {
        required = '*';
      }
    });

    return required;
  }

  validate() {
    const { values, studentGroupId, studentGroupNodeId, institutionId, depth } = this.props;

    const errorList = [];
    Object.values(values).forEach((value) => {
      REQUIRED_FIELDS.forEach((requiredField) => {
        if (!value[requiredField.value]) {
          errorList.push(requiredField.label);
        }
      });
    });

    this.props.setAddStudentsFormErrors(errorList);
    if (isEmpty(errorList)) {
      this.props.addStudents(studentGroupNodeId, studentGroupId, institutionId, depth);
    }
  }

  renderErrors() {
    const { formErrors } = this.props;

    if (!formErrors.length) {
      return <div />;
    }

    return (
      <div className="alert alert-danger">
        <strong>Error:</strong>
        {` Please enter ${uniq(formErrors).join(', ')} fields value before submitting the form.`}
      </div>
    );
  }

  renderRows() {
    const { hasPermissions, institutionId, depth, studentGroupId } = this.props;
    const rows = Array.from(Array(this.props.rows).keys());

    return rows.map((row, index) => {
      return (
        <AddStudentInputRow
          key={index}
          index={index}
          institutionId={institutionId}
          hasPermissions={hasPermissions}
          depth={depth}
          studentGroupId={studentGroupId}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderErrors()}
        <div className="table-responsive add-students-table">
          <table className="table table-hover table-fixedwidth">
            <thead>
              <tr>
                <th className="add-students-header-text">
                  First Name{this.setRequiredField('first_name')}
                </th>
                <th className="add-students-header-text">
                  Middle Name{this.setRequiredField('middle_name')}
                </th>
                <th className="add-students-header-text">
                  Last Name{this.setRequiredField('last_name')}
                </th>
                <th className="add-students-header-text">
                  Government student ID{this.setRequiredField('uid')}
                </th>
                <th className="add-students-header-text">
                  Gender{this.setRequiredField('gender')}
                </th>
                <th className="add-students-header-text">
                  Mother Tongue{this.setRequiredField('mt')}
                </th>
                <th className="add-students-header-text">
                  Academic Year{this.setRequiredField('academic_year')}
                </th>
                <th className="add-students-header-text">
                  Date of Birth{this.setRequiredField('dob')}
                </th>
                <th className="add-students-header-text">
                  Father First Name{this.setRequiredField('fatherFirstName')}
                </th>
                <th className="add-students-header-text">
                  Father Middle Name{this.setRequiredField('fatherMiddleName')}
                </th>
                <th className="add-students-header-text">
                  Father Last Name{this.setRequiredField('fatherLastName')}
                </th>
                <th className="add-students-header-text">
                  Mother First Name{this.setRequiredField('motherFirstName')}
                </th>
                <th className="add-students-header-text">
                  Mother Middle Name{this.setRequiredField('motherMiddleName')}
                </th>
                <th className="add-students-header-text">
                  Mother Last Name{this.setRequiredField('motherLastName')}
                </th>
                <th className="add-students-header-text">Save</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.validate}>
              Save
            </button>
            <button onClick={this.props.goback} className="btn btn-primary padded-btn">
              Discard
            </button>
          </div>
        </div>
        <div className="base-spacing-mid" />
      </div>
    );
  }
}

AddStudentsFormView.propTypes = {
  goback: PropTypes.func,
  formErrors: PropTypes.array,
  studentGroupNodeId: PropTypes.string,
  institutionId: PropTypes.number,
  studentGroupId: PropTypes.number,
  rows: PropTypes.number,
  values: PropTypes.object,
  setAddStudentsFormErrors: PropTypes.func,
  addStudents: PropTypes.func,
  depth: PropTypes.number,
  hasPermissions: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.addStudents.formErrors,
    rows: state.addStudents.rows,
    values: state.addStudents.values,
    path: get(state.boundaries.boundaryDetails, `[${ownProps.studentGroupNodeId}].path`),
  };
};

const AddStudentsForm = connect(mapStateToProps, {
  goback,
  setAddStudentsFormErrors,
  addStudents,
})(AddStudentsFormView);

export { AddStudentsForm };
