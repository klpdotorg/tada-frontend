import { connect } from 'react-redux';

import { StudentView } from '../../components/ViewStudents';
import { selectStudent, openEditStudentModal } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    student: state.boundaries.boundaryDetails[ownProps.id],
    selectedStudents: state.students.selectedStudents,
  };
};

const Student = connect(mapStateToProps, { selectStudent, openEditStudentModal })(StudentView);

export { Student };
