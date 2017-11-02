import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import {
  getEntities,
  getInstitutionCategories,
  getLanguages,
  getManagements,
} from '../../actions';
import { PrimaryClusterView } from '../../components/PrimaryCluster';

class FetchClusterEntity extends Component {
  componentWillMount() {
    const { params, cluster } = this.props;
    const { districtNodeId, blockNodeId, clusterNodeId } = params;

    if (isEmpty(cluster)) {
      this.props.getEntities([DEFAULT_PARENT_NODE_ID, districtNodeId, blockNodeId, clusterNodeId]);
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
  getEntities: PropTypes.func,
  getInstitutionCategories: PropTypes.func,
  getLanguages: PropTypes.func,
  getManagements: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId, clusterNodeId } = ownProps.params;

  return {
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};

const PrimaryCluster = connect(mapStateToProps, {
  getEntities,
  getLanguages,
  getInstitutionCategories,
  getManagements,
})(FetchClusterEntity);

export { PrimaryCluster };
