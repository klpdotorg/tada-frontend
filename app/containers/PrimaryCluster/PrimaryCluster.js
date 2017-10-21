import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { PrimaryBlockView } from '../../components/PrimaryBlock';
import {
  showBoundaryLoading,
  openNode,
  fetchEntitiesFromServer,
  getBoundaries,
  closeBoundaryLoading,
} from '../../actions';

class FetchClusterEntity extends Component {
  componentDidMount() {
    const { districtId, blockId, clusterId } = this.props.params;
    this.props.fetchEntities(districtId, blockId, clusterId);
  }

  render() {
    return <PrimaryBlockView {...this.props} />;
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
    dispatch(showBoundaryLoading());
    dispatch(openNode(districtId));
    dispatch(fetchEntitiesFromServer(districtId));
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(2),
    }).then(() => {
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(districtId),
      }).then(() => {
        dispatch(openNode(blockId));
        dispatch(fetchEntitiesFromServer(blockId));
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(blockId),
        }).then(() => {
          dispatch(openNode(clusterId));
          dispatch(fetchEntitiesFromServer(clusterId));
          dispatch(closeBoundaryLoading());
        });
      });
    });
  },
});

const PrimaryCluster = connect(mapStateToProps, mapDispatchToProps)(FetchClusterEntity);

export { PrimaryCluster };
