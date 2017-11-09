import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { DEFAULT_PARENT_NODE_ID } from 'config';

import { AddStudentsView } from '../../components/AddStudents';
import { getEntities, getLanguages } from '../../actions';

class FetchAddStudentResources extends Component {
  componentDidMount() {
    const { params, studentGroup } = this.props;

    const {
      blockNodeId,
      districtNodeId,
      clusterNodeId,
      institutionNodeId,
      studentGroupNodeId,
    } = params;

    if (isEmpty(studentGroup)) {
      this.props.getEntities([
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        blockNodeId,
        clusterNodeId,
        institutionNodeId,
        studentGroupNodeId,
      ]);
    }
    this.props.getLanguages();
  }

  render() {
    return <AddStudentsView {...this.props} />;
  }
}

FetchAddStudentResources.propTypes = {
  params: PropTypes.object,
  studentGroup: PropTypes.object,
  getEntities: PropTypes.func,
  getLanguages: PropTypes.func,
};

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

const AddStudents = connect(mapStateToProps, {
  getEntities,
  getLanguages,
})(FetchAddStudentResources);

export { AddStudents };
