import { connect } from 'react-redux';

import { StudentView } from '../../components/ViewStudents';

const mapStateToProps = (state, ownProps) => ({
  student: state.boundaries.boundaryDetails[ownProps.id],
});

const Student = connect(mapStateToProps)(StudentView);

export { Student };
