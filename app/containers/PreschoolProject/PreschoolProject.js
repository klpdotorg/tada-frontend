import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { PreschoolProjectView } from '../../components/PreschoolProject';
import {
  getEntities,
} from '../../actions';

class FetchProjectEntity extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params, project } = this.props;
    const { districtNodeId, projectNodeId } = params;

    if (isEmpty(project)) {
      this.props.getEntities([DEFAULT_PARENT_NODE_ID, districtNodeId, projectNodeId]);
    }
  }

  render() {
    return <PreschoolProjectView {...this.props} />;
  }
}

FetchProjectEntity.propTypes = {
  params: PropTypes.object,
  project: PropTypes.object,
  getEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { projectNodeId, districtNodeId } = ownProps.params;

  return {
    project: state.boundaries.boundaryDetails[projectNodeId] || {},
    district: state.boundaries.boundaryDetails[districtNodeId] || {},
    isLoading: state.appstate.loadingBoundary,
  };
};

const PreschoolProject = connect(mapStateToProps, { getEntities })(FetchProjectEntity);

export { PreschoolProject };
