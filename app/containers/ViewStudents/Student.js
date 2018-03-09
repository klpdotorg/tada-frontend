import { connect } from 'react-redux';
import { get } from 'lodash';

import { StudentView } from '../../components/ViewStudents';
import { selectStudent, openEditStudentModal } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    student: get(state.boundaries.boundaryDetails, ownProps.id, {}),
    selectedStudents: state.students.selectedStudents,
  };
};

const Student = connect(mapStateToProps, { selectStudent, openEditStudentModal })(StudentView);

export { Student };
