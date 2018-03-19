import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { DEFAULT_PARENT_NODE_ID } from 'config';

import { EditStudentsView } from '../../components/EditStudents';
import { getBoundariesEntities, getLanguages } from '../../actions';

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

    this.props.getLanguages();
  }

  render() {
    const {
      blockNodeId,
      districtNodeId,
      clusterNodeId,
      institutionNodeId,
      studentGroupNodeId,
    } = this.props.params;
    const path = [
      districtNodeId,
      blockNodeId,
      clusterNodeId,
      institutionNodeId,
      studentGroupNodeId,
    ];
    return <EditStudentsView {...this.props} depth={path.length} />;
  }
}

FetchAddStudentResources.propTypes = {
  params: PropTypes.object,
  studentGroup: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
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
    studentIds: get(state.boundaries.boundariesByParentId, '5', []),
    isLoading: state.appstate.loadingBoundary,
  };
};

const EditStudents = connect(mapStateToProps, {
  getBoundariesEntities,
  getLanguages,
})(FetchAddStudentResources);

export { EditStudents };