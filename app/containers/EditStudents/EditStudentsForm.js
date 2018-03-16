import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { EditStudentInputRow } from './index';
import { setEditStudentsFormErrors, editStudents, goBack, setEditStudents } from '../../actions';

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

    this.props.setEditStudentsFormErrors(errorList);
    if (_.isEmpty(errorList)) {
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
        {` Please enter ${_.uniq(formErrors).join(', ')} fields value before submitting the form.`}
      </div>
    );
  }

  renderRows() {
    const rows = Object.keys(this.props.values);

    return rows.map((id) => {
      return (
        <EditStudentInputRow key={id} id={id} index={id} institutionId={this.props.institutionId} />
      );
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
              <button onClick={this.props.goBack} className="btn btn-primary padded-btn">
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

EditStudentsFormView.propTypes = {
  goBack: PropTypes.func,
  formErrors: PropTypes.array,
  studentGroupNodeId: PropTypes.string,
  institutionId: PropTypes.number,
  studentGroupId: PropTypes.number,
  values: PropTypes.object,
  setEditStudentsFormErrors: PropTypes.func,
  editStudents: PropTypes.func,
  depth: PropTypes.number,
  setEditStudents: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    formErrors: state.editStudents.formErrors,
    values: state.editStudents.values,
    path: _.get(state.boundaries.boundaryDetails, `[${ownProps.studentGroupNodeId}].path`),
  };
};

const EditStudentsForm = connect(mapStateToProps, {
  goBack,
  setEditStudentsFormErrors,
  editStudents,
  setEditStudents,
})(EditStudentsFormView);

export { EditStudentsForm };
