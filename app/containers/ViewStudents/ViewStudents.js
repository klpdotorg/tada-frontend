import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
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

  return {
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionNodeId, {}),
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
