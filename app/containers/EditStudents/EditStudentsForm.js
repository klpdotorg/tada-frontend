import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import includes from 'lodash.includes';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import uniq from 'lodash.uniq';

import { EditStudentInputRow } from './index';
import { setEditStudentsFormErrors, editStudents, goback, setEditStudents } from '../../actions';

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

class EditStudentsFormView extends Component {
  constructor() {
    super();

    this.renderErrors = this.renderErrors.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    this.props.setEditStudents(this.props.depth);
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

    this.props.setEditStudentsFormErrors(errorList);
    if (isEmpty(errorList)) {
      this.props.editStudents(studentGroupNodeId, studentGroupId, institutionId, depth);
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
    const rows = Object.keys(this.props.values);
    const { hasPermissions } = this.props;

    return rows.map((id, i) => {
      return (
        <EditStudentInputRow
          key={id}
          id={id}
          index={i}
          institutionId={this.props.institutionId}
          hasPermissions={hasPermissions}
        />
      );
    });
  }

  render() {
    const { hasPermissions, error } = this.props;

    return (
      <div className="add-students-container">
        {!isEmpty(error) ? (
          <div className="alert alert-danger">
            {error.map((row, rowIndex) => {
              const fields = Object.keys(row);
              return (
                <p key={rowIndex}>
                  <span>
                    <strong>Row {rowIndex + 1}</strong>
                  </span>
                  <br />
                  {fields.map((field) => {
                    return (
                      <span>
                        <strong>{field}:</strong> {get(row, `${field}[0].message`, '')}
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
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.validate} disabled={!hasPermissions}>
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

EditStudentsFormView.propTypes = {
  hasPermissions: PropTypes.bool,
  goback: PropTypes.func,
  formErrors: PropTypes.array,
  studentGroupNodeId: PropTypes.string,
  institutionId: PropTypes.number,
  studentGroupId: PropTypes.number,
  values: PropTypes.object,
  setEditStudentsFormErrors: PropTypes.func,
  editStudents: PropTypes.func,
  depth: PropTypes.number,
  setEditStudents: PropTypes.func,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.editStudents.formErrors,
    values: state.editStudents.values,
    path: get(state.boundaries.boundaryDetails, `[${ownProps.studentGroupNodeId}].path`),
    error: state.students.error,
  };
};

const EditStudentsForm = connect(mapStateToProps, {
  goback,
  setEditStudentsFormErrors,
  editStudents,
  setEditStudents,
})(EditStudentsFormView);

export { EditStudentsForm };
