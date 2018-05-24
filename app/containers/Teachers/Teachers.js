import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { TeacherScreen } from '../../components/Teachers';
import {
  getBoundariesEntities,
  getTeachers,
  getLanguages,
  showAddTeacherPopup,
  showTeacherLoading,
} from '../../actions';
import { checkPermissions } from '../../utils';

class GetTeachers extends Component {
  constructor(props) {
    super(props);

    this.getEntities = this.getEntities.bind(this);
  }

  componentDidMount() {
    const { institution } = this.props;
    this.props.getLanguages();
    this.props.showTeacherLoading();

    if (isEmpty(institution)) {
      const entities = this.getEntities();

      this.props.getBoundariesEntities(entities);
    }

    if (!isEmpty(institution)) {
      this.props.getTeachers(institution.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.institution !== this.props.institution) {
      if (!isEmpty(nextProps.institution)) {
        this.props.getTeachers(nextProps.institution.id);
      }
    }
  }

  getEntities() {
    const { params } = this.props;
    const { blockNodeId, districtNodeId, clusterNodeId } = params;

    return [DEFAULT_PARENT_NODE_ID, districtNodeId, blockNodeId, clusterNodeId].map((id, i) => {
      return { depth: i, uniqueId: id };
    });
  }

  render() {
    return <TeacherScreen {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = ownProps.params;
  const district = get(state.boundaries.boundaryDetails, districtNodeId, {});
  const block = get(state.boundaries.boundaryDetails, blockNodeId, {});
  const cluster = get(state.boundaries.boundaryDetails, clusterNodeId, {});
  const institution = get(state.boundaries.boundaryDetails, institutionNodeId, {});
  const { isAdmin } = state.profile;
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
    teacherIds: Object.keys(state.teachers.teachers),
    isLoading: state.appstate.loadingBoundary,
    teacherLoading: state.teachers.loading,
    hasPermissions,
  };
};

GetTeachers.propTypes = {
  teacherIds: PropTypes.array,
  params: PropTypes.object,
  institution: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
  getTeachers: PropTypes.func,
  getLanguages: PropTypes.func,
  primary: PropTypes.bool,
  showTeacherLoading: PropTypes.func,
};

const Teachers = connect(mapStateToProps, {
  getBoundariesEntities,
  getTeachers,
  getLanguages,
  showAddTeacherPopup,
  showTeacherLoading,
})(GetTeachers);

export { Teachers };
