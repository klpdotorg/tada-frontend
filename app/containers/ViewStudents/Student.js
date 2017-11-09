import { connect } from 'react-redux';

import { StudentView } from '../../components/ViewStudents';
import { selectStudent } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  student: state.boundaries.boundaryDetails[ownProps.id],
  selectedStudents: state.students.selectedStudents,
});

const Student = connect(mapStateToProps, { selectStudent })(StudentView);

export { Student };
