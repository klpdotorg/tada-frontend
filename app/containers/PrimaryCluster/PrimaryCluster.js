import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { fetchClusterEntity } from '../../actions';
import { PrimaryClusterView } from '../../components/PrimaryCluster';

class FetchClusterEntity extends Component {
  componentWillMount() {
    const { districtId, blockId, clusterId } = this.props.params;
    this.props.fetchEntities(districtId, blockId, clusterId);
  }

  render() {
    return <PrimaryClusterView {...this.props} />;
  }
}

FetchClusterEntity.propTypes = {
  params: PropTypes.object,
  fetchEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockId, districtId, clusterId } = ownProps.params;

  return {
    cluster: get(state.boundaries.boundaryDetails, clusterId, {}),
    block: get(state.boundaries.boundaryDetails, blockId, {}),
    district: get(state.boundaries.boundaryDetails, districtId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEntities: (districtId, blockId, clusterId) => {
    dispatch(fetchClusterEntity(districtId, blockId, clusterId));
  },
});

const PrimaryCluster = connect(mapStateToProps, mapDispatchToProps)(FetchClusterEntity);

export { PrimaryCluster };
