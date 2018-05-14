import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { DEFAULT_PARENT_NODE_ID } from 'config';

import { EditStudentsView } from '../../components/EditStudents';
import { getBoundariesEntities, getLanguages } from '../../actions';
import { checkPermissions } from '../../utils';

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
  const { isAdmin } = state.profile;
  const district = get(state.boundaries.boundaryDetails, districtNodeId, {});
  const block = get(state.boundaries.boundaryDetails, blockNodeId, {});
  const cluster = get(state.boundaries.boundaryDetails, clusterNodeId, {});
  const institution = get(state.boundaries.boundaryDetails, institutionNodeId, {});
  const hasPermissions = checkPermissions(
    isAdmin,
    state.userPermissions,
    [district.id, block.id, cluster.id],
    institution.id,
  );

  return {
    district,
    block,
    cluster,
    institution,
    studentGroup: get(state.boundaries.boundaryDetails, studentGroupNodeId, {}),
    studentIds: get(state.boundaries.boundariesByParentId, '5', []),
    isLoading: state.appstate.loadingBoundary,
    hasPermissions,
  };
};

const EditStudents = connect(mapStateToProps, {
  getBoundariesEntities,
  getLanguages,
})(FetchAddStudentResources);

export { EditStudents };
