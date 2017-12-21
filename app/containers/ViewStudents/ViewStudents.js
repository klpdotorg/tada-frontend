import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, keys } from 'lodash';
import { connect } from 'react-redux';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { getEntities, fetchStudents } from '../../actions';
import { ViewStudentsCont } from '../../components/ViewStudents';

class FetchStudents extends Component {
  componentDidMount() {
    const { params, studentIds, studentGroup } = this.props;

    const {
      blockNodeId,
      districtNodeId,
      clusterNodeId,
      institutionNodeId,
      studentGroupNodeId,
    } = params;
    console.log(params, studentIds, 'printing student Ids');
    if (!studentIds.length) {
      this.props.getEntities([
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        blockNodeId,
        clusterNodeId,
        institutionNodeId,
        studentGroupNodeId,
      ]);
    }

    const studentGroupId = get(this.props.studentGroup, 'id');

    if (studentGroupId) {
      this.props.fetchStudents(studentGroupId);
    }
  }

  render() {
    return <ViewStudentsCont {...this.props} />;
  }
}

FetchStudents.propTypes = {
  getEntities: PropTypes.func,
  params: PropTypes.object,
  studentIds: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  const {
    districtNodeId,
    blockNodeId,
    clusterNodeId,
    institutionNodeId,
    studentGroupNodeId,
  } = ownProps.params;

  const studentIds = keys(state.students.students);

  return {
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionNodeId, {}),
    studentGroup: get(state.boundaries.boundaryDetails, studentGroupNodeId, {}),
    studentIds,
    isLoading: state.appstate.loadingBoundary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEntities: (entities) => {
      dispatch(getEntities(entities));
    },
  };
};

const ViewStudents = connect(mapStateToProps, { getEntities, fetchStudents })(FetchStudents);

export { ViewStudents };
