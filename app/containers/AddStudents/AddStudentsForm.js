import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pop } from 'react-router-redux';
import _ from 'lodash';

import { AddStudentsInputRow } from './index';

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
    value: 'fatherFirstName',
    label: 'Father First Name',
  },
  {
    value: 'motherFirstName',
    label: 'Mother First Name',
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
  }

  setRequiredField(field) {
    let required = '';

    _.map(REQUIRED_FIELDS, requiredField => {
      if (_.includes(requiredField.value, field)) {
        required = '*';
      }
    });

    return required;
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

    return rows.map((row, index) => <AddStudentsInputRow key={index} index={index} />);
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
  rows: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  closeAddStudentForm: () => {
    dispatch(pop());
  },
});

const mapStateToProps = state => ({
  formErrors: state.addStudents.formErrors,
  rows: state.addStudents.rows,
});

const AddStudentsForm = connect(mapStateToProps, mapDispatchToProps)(AddStudentsFormView);

export { AddStudentsForm };
