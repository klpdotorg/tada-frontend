import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';

import { EditStudentsView } from '../../components/EditStudents';
import { getBoundariesEntities, getLanguages } from '../../actions';
import { checkPermissions, getEntitiesPath } from '../../utils';

class FetchAddStudentResources extends Component {
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
    studentIds: get(state.boundaries.boundariesByParentId, '5', []),
    isLoading: state.appstate.loadingBoundary,
    hasPermissions,
    paths,
    parentId: state.profile.parentNodeId,
  };
};

const EditStudents = connect(mapStateToProps, {
  getBoundariesEntities,
  getLanguages,
})(FetchAddStudentResources);

export default EditStudents;
