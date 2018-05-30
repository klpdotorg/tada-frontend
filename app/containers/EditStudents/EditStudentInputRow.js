import { connect } from 'react-redux';

import { StudentInputRow } from '../common';
import { editStudentsFormValueChanged, modifyStudent } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { languages } = state.languages;
  const value = state.editStudents.values[ownProps.id];
  const student = {
    id: value.id,
    first_name: value.first_name,
    middle_name: value.middle_name,
    last_name: value.last_name,
    dob: value.dob,
    father_name: value.father_name,
    mother_name: value.mother_name,
    uid: value.uid,
    mt: languages.find((lang) => {
      return lang.value === value.mt;
    }).value,
    academic_year: value.academic_year,
    gender: value.gender,
  };

  return {
    formErrors: state.addStudents.formErrors,
    languages,
    student,
  };
};

const EditStudentInputRow = connect(mapStateToProps, {
  updateValue: editStudentsFormValueChanged,
  onSave: modifyStudent,
})(StudentInputRow);

export { EditStudentInputRow };
