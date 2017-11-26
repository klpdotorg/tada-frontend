import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { TeacherScreen } from '../../components/Teachers';
import { TOGGLE_MODAL } from '../../actions/types';
import { getEntities, getTeachers, getLanguages } from '../../actions';

class GetTeachers extends Component {
  componentDidMount() {
    const { params, institution } = this.props;

    const { blockNodeId, districtNodeId, clusterNodeId } = params;

    this.props.getLanguages();

    if (isEmpty(institution)) {
      this.props.getEntities([DEFAULT_PARENT_NODE_ID, districtNodeId, blockNodeId, clusterNodeId]);
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
    teacherIds: state.teachers.teachers.map((teacher) => {
      return teacher.id;
    }),
    isLoading: state.appstate.loadingBoundary,
    teacherLoading: state.teachers.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAddTeacherPopup: () => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createTeacher',
      });
    },
    getEntities: (entities) => {
      dispatch(getEntities(entities));
    },
    getTeachers: (institutionId) => {
      dispatch(getTeachers(institutionId));
    },
    getLanguages: () => {
      dispatch(getLanguages());
    },
  };
};

GetTeachers.propTypes = {
  teacherIds: PropTypes.array,
  params: PropTypes.object,
  institution: PropTypes.object,
  getEntities: PropTypes.func,
  getTeachers: PropTypes.func,
  getLanguages: PropTypes.func,
};

const Teachers = connect(mapStateToProps, mapDispatchToProps)(GetTeachers);

export { Teachers };
