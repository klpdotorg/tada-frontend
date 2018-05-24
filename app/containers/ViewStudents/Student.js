import { connect } from 'react-redux';
import get from 'lodash.get';

import { StudentView } from '../../components/ViewStudents';
import { selectStudent, openEditStudentModal, deleteStudent } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { selectedStudents } = state.students;
  const { isAdmin } = state.profile;

  return {
    student: get(state.boundaries.boundaryDetails, ownProps.studentNodeId, {}),
    selectedStudents,
    canDelete: isAdmin,
  };
};

const Student = connect(mapStateToProps, {
  selectStudent,
  openEditStudentModal,
  deleteStudent,
})(StudentView);

export { Student };
