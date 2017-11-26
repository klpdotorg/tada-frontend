import { connect } from 'react-redux';
import { TeacherView } from '../../components/Teachers';
import { setEditTeacherId, deleteTeacher } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    teacher: state.teachers.teachers.find((teacher) => {
      return teacher.id === ownProps.id;
    }),
    languages: state.languages.languages,
  };
};

const Teacher = connect(mapStateToProps, { setEditTeacherId, deleteTeacher })(TeacherView);

export { Teacher };
