import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { userHasPermissions } from '../../components/utils';
import { StudentGroupView } from '../../components/StudentGroup';
import { getBoundariesEntities, openViewStudents, openAddStudents } from '../../actions';
import { checkPermissions } from '../../utils';

class FetchStudentGroupEntity extends Component {
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
    return <StudentGroupView {...this.props} depth={path.length} />;
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
  const { isAdmin } = state.profile;
  const studentGroup = get(state.boundaries.boundaryDetails, studentGroupNodeId, {});
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
    studentGroup,
    isLoading: state.appstate.loadingBoundary,
    isPrimary: state.schoolSelection.primarySchool,
    hasPermissions,
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
