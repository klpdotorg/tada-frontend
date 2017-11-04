import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { push } from 'react-router-redux';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { userHasPermissions } from '../../components/utils';
import { StudentGroupView } from '../../components/StudentGroup';
import {
  getEntities,
} from '../../actions';

class FetchStudentGroupEntity extends Component {
  constructor(props) {
    super(props);

    this.hasPermissions = this.hasPermissions.bind(this);
  }

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
  }

  hasPermissions(institutionId) {
    return true || userHasPermissions(this.props.permissions, institutionId);
  }

  render() {
    return <StudentGroupView {...this.props} hasPermissions={this.hasPermissions} />;
  }
}

FetchStudentGroupEntity.propTypes = {
  params: PropTypes.object,
  studentGroup: PropTypes.object,
  getEntities: PropTypes.func,
  permissions: PropTypes.object,
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
    isPrimary: state.schoolSelection.primarySchool,
    permissions: state.login.permissions,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleStudentModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createClass',
    });
  },
  viewStudent: (path) => {
    dispatch(push(`${path}/students`));
  },
  getEntities: (entityIds) => {
    dispatch(getEntities(entityIds));
  },
  showBulkAdd: () => {
    console.log('Show bulk add.');
  },
});

const StudentGroup = connect(mapStateToProps, mapDispatchToProps)(FetchStudentGroupEntity);

export { StudentGroup };
