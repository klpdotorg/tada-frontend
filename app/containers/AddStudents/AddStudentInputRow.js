import { connect } from 'react-redux';
import { get } from 'lodash';

import { StudentInputRow } from '../common';
import { openNode, saveNewStudends, addStudentsFormValueChanged } from '../../actions';

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

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (value, rowNumber) => {
      dispatch(addStudentsFormValueChanged(value, rowNumber));
    },
  };
};

const AddStudentInputRow = connect(mapStateToProps, {
  updateValue: addStudentsFormValueChanged,
})(StudentInputRow);

export { AddStudentInputRow };
