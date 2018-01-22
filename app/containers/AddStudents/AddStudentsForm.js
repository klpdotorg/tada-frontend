import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pop } from 'react-router-redux';
import _ from 'lodash';

import { AddStudentsInputRow } from './index';
import { setAddStudentsFormErrors, addStudents, openNode } from '../../actions';

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

    _.map(REQUIRED_FIELDS, (requiredField) => {
      if (_.includes(requiredField.value, field)) {
        required = '*';
      }
    });

    return required;
  }

  validate() {
    const { values, studentGroupId, studentGroupNodeId, institutionId, depth } = this.props;

    const errorList = [];
    _.values(values).forEach((value) => {
      REQUIRED_FIELDS.forEach((requiredField) => {
        if (!value[requiredField.value]) {
          errorList.push(requiredField.label);
        }
      });
    });

    this.props.setAddStudentFormErrors(errorList);
    if (_.isEmpty(errorList)) {
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
        {` Please enter ${_.uniq(formErrors).join(', ')} fields value before submitting the form.`}
      </div>
    );
  }

  renderRows() {
    const rows = Array.from(Array(this.props.rows).keys());

    return rows.map((row, index) => {
      return <AddStudentsInputRow key={index} index={index} />;
    });
  }

  render() {
    return (
      <div>
        {this.renderErrors()}
        <div className="table-responsive">
          <table className="table table-hover table-fixedwidth">
            <thead>
              <tr className="text-primary text-uppercase">
                <th>First Name{this.setRequiredField('first_name')}</th>
                <th>Middle Name{this.setRequiredField('middle_name')}</th>
                <th>Last Name{this.setRequiredField('last_name')}</th>
                <th>Government student ID{this.setRequiredField('uid')}</th>
                <th>Gender{this.setRequiredField('gender')}</th>
                <th>Mother Tongue{this.setRequiredField('mt')}</th>
                <th>Academic Year{this.setRequiredField('academic_year')}</th>
                <th>Date of Birth{this.setRequiredField('dob')}</th>
                <th>Father First Name{this.setRequiredField('fatherFirstName')}</th>
                <th>Father Middle Name{this.setRequiredField('fatherMiddleName')}</th>
                <th>Father Last Name{this.setRequiredField('fatherLastName')}</th>
                <th>Mother First Name{this.setRequiredField('motherFirstName')}</th>
                <th>Mother Middle Name{this.setRequiredField('motherMiddleName')}</th>
                <th>Mother Last Name{this.setRequiredField('motherLastName')}</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={this.validate}>
                Save
              </button>
              <button
                onClick={this.props.closeAddStudentForm}
                className="btn btn-primary padded-btn"
              >
                Discard
              </button>
            </div>
          </div>
          <div className="base-spacing-mid" />
        </div>
      </div>
    );
  }
}

AddStudentsFormView.propTypes = {
  closeAddStudentForm: PropTypes.func,
  formErrors: PropTypes.array,
  studentGroupNodeId: PropTypes.string,
  institutionId: PropTypes.number,
  studentGroupId: PropTypes.number,
  path: PropTypes.string,
  rows: PropTypes.number,
  values: PropTypes.object,
  setAddStudentFormErrors: PropTypes.func,
  addStudents: PropTypes.func,
  depth: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeAddStudentForm: () => {
      dispatch(pop());
    },
    setAddStudentFormErrors: (errors) => {
      dispatch(setAddStudentsFormErrors(errors));
    },
    addStudents: (studentGroupNodeId, studentGroupId, institutionId, depth) => {
      dispatch(openNode(studentGroupNodeId));
      dispatch(addStudents(studentGroupId, institutionId, depth, studentGroupNodeId));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.addStudents.formErrors,
    rows: state.addStudents.rows,
    values: state.addStudents.values,
    path: _.get(state.boundaries.boundaryDetails, `[${ownProps.studentGroupNodeId}].path`),
  };
};

const AddStudentsForm = connect(mapStateToProps, mapDispatchToProps)(AddStudentsFormView);

export { AddStudentsForm };
