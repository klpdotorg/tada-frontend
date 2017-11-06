import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { AddStudentsView } from '../../components/AddStudents';

class FetchAddStudentResources extends Component {
  componentDidMount() {
    // this.props.getLanguages();
  }

  render() {
    return <AddStudentsView {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    blockNodeId,
    districtNodeId,
    clusterNodeId,
    institutionNodeId,
    studentGroupNodeId,
  } = ownProps.params;

  return {
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionNodeId, {}),
    studentGroup: get(state.boundaries.boundaryDetails, studentGroupNodeId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};
const AddStudents = connect(mapStateToProps)(FetchAddStudentResources);

export { AddStudents };
