import { connect } from 'react-redux';
import { get } from 'lodash';
import { StudentListView } from '../../components/ViewStudents';

const mapStateToProps = (state) => {
  return {
    studentIds: get(state.boundaries.boundariesByParentId, '5', []),
    loading: state.appstate.loadingBoundary,
  };
};

const StudentList = connect(mapStateToProps)(StudentListView);

export { StudentList };
