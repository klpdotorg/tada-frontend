import { connect } from 'react-redux';

import { TeacherView } from '../../components/Teachers';
import { setEditTeacherId, deleteTeacher } from '../../actions';
import { getStaffTypes } from './utils';

const mapStateToProps = (state, ownProps) => {
  return {
    teacher: state.teachers.teachers[ownProps.id],
    languages: state.languages.languages,
    staffTypes: getStaffTypes(state.schoolSelection.primarySchool),
  };
};

const Teacher = connect(mapStateToProps, { setEditTeacherId, deleteTeacher })(TeacherView);

export { Teacher };
