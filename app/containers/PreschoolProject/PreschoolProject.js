import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { PreschoolProjectView } from '../../components/PreschoolProject';
import { getBoundariesEntities } from '../../actions';
import { getEntitiesPath } from '../../utils';

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
  const pathname = get(ownProps, ['location', 'pathname'], '');
  const paths = getEntitiesPath(pathname, [districtNodeId]);

  return {
    project: state.boundaries.boundaryDetails[projectNodeId] || {},
    district: state.boundaries.boundaryDetails[districtNodeId] || {},
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
    paths,
  };
};

const PreschoolProject = connect(mapStateToProps, { getBoundariesEntities })(FetchProjectEntity);

export default PreschoolProject;
