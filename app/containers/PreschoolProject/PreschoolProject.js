import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { PreschoolProjectView } from '../../components/PreschoolProject';
import { getBoundariesEntities } from '../../actions';

class FetchProjectEntity extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params, project } = this.props;
    const { districtNodeId, projectNodeId } = params;

    if (isEmpty(project)) {
      const entities = [DEFAULT_PARENT_NODE_ID, districtNodeId, projectNodeId].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }
  }

  render() {
    return <PreschoolProjectView {...this.props} />;
  }
}

FetchProjectEntity.propTypes = {
  params: PropTypes.object,
  project: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { projectNodeId, districtNodeId } = ownProps.params;
  const { isAdmin } = state.profile;

  return {
    project: state.boundaries.boundaryDetails[projectNodeId] || {},
    district: state.boundaries.boundaryDetails[districtNodeId] || {},
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
  };
};

const PreschoolProject = connect(mapStateToProps, { getBoundariesEntities })(FetchProjectEntity);

export default PreschoolProject;
