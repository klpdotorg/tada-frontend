import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { getBoundariesEntities, fetchStudents } from '../../actions';
import { ViewStudentsCont } from '../../components/ViewStudents';

class FetchStudents extends Component {
  componentDidMount() {
    const { params, studentIds } = this.props;

    const {
      blockNodeId,
      districtNodeId,
      clusterNodeId,
      institutionNodeId,
      studentGroupNodeId,
    } = params;

    if (!studentIds.length) {
      const entities = [
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        blockNodeId,
        clusterNodeId,
        institutionNodeId,
        studentGroupNodeId,
      ].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }
  }

  render() {
    return <ViewStudentsCont {...this.props} />;
  }
}

FetchStudents.propTypes = {
  getBoundariesEntities: PropTypes.func,
  params: PropTypes.object,
  studentIds: PropTypes.array,
  studentGroup: PropTypes.object,
  fetchStudents: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const {
    districtNodeId,
    blockNodeId,
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
    studentIds: get(state.boundaries.boundariesByParentId, 5, []),
    isLoading: state.appstate.loadingBoundary,
  };
};

const ViewStudents = connect(mapStateToProps, {
  getBoundariesEntities,
  fetchStudents,
})(FetchStudents);

export { ViewStudents };
