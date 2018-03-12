import { connect } from 'react-redux';
import { get } from 'lodash';

import { StudentView } from '../../components/ViewStudents';
import { selectStudent, openEditStudentModal, deleteStudent } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    student: get(state.boundaries.boundaryDetails, ownProps.studentNodeId, {}),
    selectedStudents: state.students.selectedStudents,
  };
};

const Student = connect(mapStateToProps, {
  selectStudent,
  openEditStudentModal,
  deleteStudent,
})(StudentView);

export { Student };
