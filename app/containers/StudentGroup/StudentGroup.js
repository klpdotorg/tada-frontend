import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { userHasPermissions } from '../../components/utils';
import { StudentGroupView } from '../../components/StudentGroup';
import { getBoundariesEntities, openViewStudents, openAddStudents } from '../../actions';

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

  hasPermissions(institutionId) {
    return true || userHasPermissions(this.props.permissions, institutionId);
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
    return (
      <StudentGroupView {...this.props} hasPermissions={this.hasPermissions} depth={path.length} />
    );
  }
}

FetchStudentGroupEntity.propTypes = {
  params: PropTypes.object,
  studentGroup: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleStudentModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createClass',
      });
    },
    viewStudent: (id, depth) => {
      dispatch(openViewStudents(id, depth));
    },
    getBoundariesEntities: (entityIds) => {
      dispatch(getBoundariesEntities(entityIds));
    },
    showBulkAdd: (id, depth) => {
      dispatch(openAddStudents(id, depth));
    },
  };
};

const StudentGroup = connect(mapStateToProps, mapDispatchToProps)(FetchStudentGroupEntity);

export { StudentGroup };
