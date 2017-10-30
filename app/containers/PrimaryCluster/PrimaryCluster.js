import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_ID } from 'config';
import { getEntities } from '../../actions';
import { PrimaryClusterView } from '../../components/PrimaryCluster';

class FetchClusterEntity extends Component {
  componentWillMount() {
    const { params, cluster } = this.props;
    const { districtId, blockId, clusterId } = params;

    if (isEmpty(cluster)) {
      this.props.getEntities([DEFAULT_PARENT_ID, districtId, blockId, clusterId]);
    }
  }

  render() {
    return <PrimaryClusterView {...this.props} />;
  }
}

FetchClusterEntity.propTypes = {
  params: PropTypes.object,
  cluster: PropTypes.object,
  getEntities: PropTypes.func,
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

const PrimaryCluster = connect(mapStateToProps, { getEntities })(FetchClusterEntity);

export { PrimaryCluster };
