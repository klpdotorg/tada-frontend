import { connect } from 'react-redux';
import get from 'lodash.get';
import { DEFAULT_YEAR } from 'config';

import { StudentInputRow } from '../common';
import { addStudentsFormValueChanged, addStudent } from '../../actions';
import { checkRequiredLengthFields, checkForRequiredFields } from './utils';

const getStudent = (values, languages) => {
  const lang = get(languages, get(values, 'mt', ''), 'kan');

  return {
    first_name: get(values, 'first_name', ''),
    middle_name: get(values, 'middle_name', ''),
    last_name: get(values, 'last_name', ''),
    dob: get(values, 'dob', ''),
    father_name: get(values, 'father_name', ''),
    mother_name: get(values, 'mother_name', ''),
    uid: get(values, 'uid', ''),
    mt: lang,
    academic_year: get(values, 'academic', DEFAULT_YEAR),
    gender: get(values, 'gender', 'male'),
  };
};

const mapStateToProps = (state, ownProps) => {
  const { languages } = state.languages;
  const { values } = state.addStudents;
  const student = getStudent(values[ownProps.index], languages);
  const requiredDisabled = checkForRequiredFields(values[ownProps.index]);
  const requiredLength = checkRequiredLengthFields(values[ownProps.index]);

  return {
    formErrors: state.addStudents.formErrors,
    languages,
    student,
    action: 'addStudents',
    disabled: !(!requiredDisabled && !requiredLength),
  };
};

const AddStudentInputRow = connect(mapStateToProps, {
  updateValue: addStudentsFormValueChanged,
  addStudent,
})(StudentInputRow);

export { AddStudentInputRow };
