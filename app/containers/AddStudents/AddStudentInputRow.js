import { connect } from 'react-redux';
import get from 'lodash.get';

import { StudentInputRow } from '../common';
import { addStudentsFormValueChanged, addStudent } from '../../actions';

const mapStateToProps = (state) => {
  const { languages } = state.languages;
  const student = {
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    uid: '',
    mt: get(languages, '[0].value'),
    academic_year: '0607',
    gender: 'male',
  };

  return {
    formErrors: state.addStudents.formErrors,
    languages,
    student,
  };
};

const AddStudentInputRow = connect(mapStateToProps, {
  updateValue: addStudentsFormValueChanged,
  addStudent,
})(StudentInputRow);

export { AddStudentInputRow };
