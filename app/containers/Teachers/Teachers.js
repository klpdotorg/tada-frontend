import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { TeacherScreen } from '../../components/Teachers';
import { TOGGLE_MODAL } from '../../actions/types';
import { getEntities } from '../../actions';

class GetTeachers extends Component {
  conponentDidMount() {
    const { params, teacherIds } = this.props;

    const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = params;
    if (isEmpty(teacherIds)) {
      this.props.getEntities([
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        blockNodeId,
        clusterNodeId,
        institutionNodeId,
      ]);
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
    teachersIds: state.teachers[ownProps.institutionId],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAddTeacherPop: () => {
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'createTeacher',
      });
    },
    getEntities: (entities) => {
      dispatch(getEntities(entities));
    },
  };
};

GetTeachers.propTypes = {
  teacherIds: PropTypes.array,
  params: PropTypes.object,
  getEntities: PropTypes.func,
};

const Teachers = connect(mapStateToProps, mapDispatchToProps)(GetTeachers);

export { Teachers };
