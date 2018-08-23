import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import uniq from 'lodash.uniq';
import includes from 'lodash.includes';
import get from 'lodash.get';

import { AddStudentInputRow } from './index';
import { goback, setAddStudentsFormErrors, addStudents } from '../../actions';
import { checkForRequiredFields, checkRequiredLengthFields } from './utils';

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
    this.disabledSubmit = this.disabledSubmit.bind(this);
  }

  setRequiredField(field) {
    let required = '';

    REQUIRED_FIELDS.forEach((requiredField) => {
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

  disabledSubmit() {
    let disabled = true;
    const { values } = this.props;
    const keys = Object.keys(this.props.values);

    keys.forEach((key) => {
      const requiredDisabled = checkForRequiredFields(values[key]);
      const requiredLength = checkRequiredLengthFields(values[key]);
      if (!requiredDisabled && !requiredLength) {
        disabled = false;
      }
    });

    return disabled;
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
          id={index}
          institutionId={institutionId}
          hasPermissions={hasPermissions}
          depth={depth}
          studentGroupId={studentGroupId}
        />
      );
    });
  }

  render() {
    const { error } = this.props;
    const disabled = this.disabledSubmit();

    return (
      <div className="add-students-container">
        {!isEmpty(error) ? (
          <div className="alert alert-danger">
            {error.map((row, rowIndex) => {
              const fields = Object.keys(row);

              if (!fields.length) {
                return <span />;
              }

              return (
                <p key={rowIndex}>
                  <span>
                    <strong>Row {rowIndex + 1}</strong>
                  </span>
                  <br />
                  {fields.map((field) => {
                    return (
                      <span style={{ paddingLeft: 10 }}>
                        <strong>{field}:</strong> {get(row, `${field}[0]`, '')}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>
        ) : (
          <span />
        )}
        {this.renderErrors()}
        <div className="table-responsive add-students-table">
          <table className="table table-hover table-fixedwidth">
            <thead>
              <tr>
                <th>#</th>
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
                {/* <th className="add-students-header-text">
                  Academic Year{this.setRequiredField('academic_year')}
                </th> */}
                <th className="add-students-header-text">
                  Date of Birth{this.setRequiredField('dob')}
                </th>
                <th className="add-students-header-text">
                  Father Name{this.setRequiredField('father_name')}
                </th>
                <th className="add-students-header-text">
                  Mother Name{this.setRequiredField('mother_name')}
                </th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.validate} disabled={disabled}>
              Save
            </button>
            <button onClick={this.props.goback} className="btn btn-primary padded-btn">
              Go Back
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
  error: PropTypes.object,
  hasPermissions: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.addStudents.formErrors,
    rows: state.addStudents.rows,
    values: state.addStudents.values,
    path: get(state.boundaries.boundaryDetails, `[${ownProps.studentGroupNodeId}].path`),
    error: state.students.error,
  };
};

const AddStudentsForm = connect(mapStateToProps, {
  goback,
  setAddStudentsFormErrors,
  addStudents,
})(AddStudentsFormView);

export { AddStudentsForm };
