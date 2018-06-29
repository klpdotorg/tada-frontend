import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import {
  getBoundariesEntities,
  fetchStudentBoundaries,
  openEditStudentsForm,
  fetchCenters,
  selectCenter,
  mapStudentsWithCenter,
} from '../../actions';
import { ViewStudentsCont } from '../../components/ViewStudents';
import { checkPermissions, getEntitiesPath } from '../../utils';

class FetchStudents extends Component {
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

    const studentGroupId = get(this.props.studentGroup, 'id');
    if (studentGroupId) {
      this.props.fetchStudentBoundaries(studentGroupNodeId);
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
  fetchStudentBoundaries: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const {
    districtNodeId,
    blockNodeId,
    clusterNodeId,
    institutionNodeId,
    studentGroupNodeId,
  } = ownProps.params;
  const studentIds = get(state.boundaries.boundariesByParentId, '5', []);
  const { centers, selectedCenter } = state.centers;
  const { selectedStudents } = state.students;
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
  const pathname = get(ownProps, ['location', 'pathname'], '');
  const paths = getEntitiesPath(pathname, [
    districtNodeId,
    blockNodeId,
    clusterNodeId,
    institutionNodeId,
    studentGroupNodeId,
  ]);

  return {
    district,
    block,
    cluster,
    institution,
    studentGroup: get(state.boundaries.boundaryDetails, studentGroupNodeId, {}),
    studentIds,
    centers: centers.map((center) => {
      return {
        value: center.id,
        label: center.name,
      };
    }),
    selectedCenter,
    canEdit: !studentIds.length,
    isLoading: state.appstate.loadingBoundary,
    canMapStudents: !isEmpty(selectedStudents) && !isEmpty(centers),
    hasPermissions,
    paths,
  };
};

const ViewStudents = connect(mapStateToProps, {
  getBoundariesEntities,
  fetchStudentBoundaries,
  openEditStudentsForm,
  fetchCenters,
  selectCenter,
  mapStudentsWithCenter,
})(FetchStudents);

export { ViewStudents };
