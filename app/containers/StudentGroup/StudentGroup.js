import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { StudentGroupView } from '../../components/StudentGroup';
import { getBoundariesEntities, openViewStudents, openAddStudents } from '../../actions';
import { checkPermissions, getEntitiesPath } from '../../utils';

class FetchStudentGroupEntity extends Component {
  componentDidMount() {
    const { params, studentGroup, parentId } = this.props;

    const {
      blockNodeId,
      districtNodeId,
      clusterNodeId,
      institutionNodeId,
      studentGroupNodeId,
    } = params;

    if (isEmpty(studentGroup)) {
      const entities = [
        parentId,
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
  parentId: PropTypes.string,
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
  const pathname = get(ownProps, ['location', 'pathname'], '');
  const paths = getEntitiesPath(pathname, [
    districtNodeId,
    blockNodeId,
    clusterNodeId,
    institutionNodeId,
  ]);

  return {
    district,
    block,
    cluster,
    institution,
    studentGroup,
    isLoading: state.appstate.loadingBoundary,
    isPrimary: state.schoolSelection.primarySchool,
    hasPermissions,
    paths,
    parentId: state.profile.parentNodeId,
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

export default StudentGroup;
