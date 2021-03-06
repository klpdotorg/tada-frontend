import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import {
  getBoundariesEntities,
  getInstitutionCategories,
  getLanguages,
  getManagements,
} from '../../actions';
import { PrimaryClusterView } from '../../components/PrimaryCluster';
import { getEntitiesPath } from '../../utils';

class FetchClusterEntity extends Component {
  componentWillMount() {
    const { params, cluster, parentId } = this.props;
    const { districtNodeId, blockNodeId, clusterNodeId } = params;
    if (isEmpty(cluster)) {
      const entities = [parentId, districtNodeId, blockNodeId, clusterNodeId].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }

    this.props.getInstitutionCategories();
    this.props.getLanguages();
    this.props.getManagements();
  }

  render() {
    return <PrimaryClusterView {...this.props} />;
  }
}

FetchClusterEntity.propTypes = {
  params: PropTypes.object,
  cluster: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
  getInstitutionCategories: PropTypes.func,
  getLanguages: PropTypes.func,
  getManagements: PropTypes.func,
  parentId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId, clusterNodeId } = ownProps.params;
  const { isAdmin } = state.profile;
  const pathname = get(ownProps, ['location', 'pathname'], '');
  const paths = getEntitiesPath(pathname, [districtNodeId, blockNodeId]);

  return {
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
    paths,
    parentId: state.profile.parentNodeId,
  };
};

const PrimaryCluster = connect(mapStateToProps, {
  getBoundariesEntities,
  getLanguages,
  getInstitutionCategories,
  getManagements,
})(FetchClusterEntity);

export default PrimaryCluster;
