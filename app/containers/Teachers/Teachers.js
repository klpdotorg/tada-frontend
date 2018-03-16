import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { TeacherScreen } from '../../components/Teachers';
import {
  getBoundariesEntities,
  getTeachers,
  getLanguages,
  showAddTeacherPopup,
  showTeacherLoading,
} from '../../actions';

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

  return {
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionNodeId, {}),
    teacherIds: Object.keys(state.teachers.teachers),
    isLoading: state.appstate.loadingBoundary,
    teacherLoading: state.teachers.loading,
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
