import { connect } from 'react-redux';
import get from 'lodash.get';

import { selectClusterOfMA, selectAllClustersOfMA } from '../../actions';
import { ShowClustersView } from '../../components/MapAssessments';

const getBoundaries = (state) => {
  const boundaryIds = get(
    state.boundaries.boundariesByParentId,
    state.mapAssessments.clustersIndex,
    [],
  );

  return boundaryIds.map((id) => {
    return {
      uniqueId: id,
      value: state.boundaries.boundaryDetails[id],
    };
  });
};

const mapStateToProps = (state) => {
  return {
    clusters: getBoundaries(state),
    loading: state.appstate.loadingBoundary,
    selectedClusters: state.mapAssessments.selectedClusters,
  };
};

const ShowClusters = connect(mapStateToProps, {
  selectAllClusters: selectAllClustersOfMA,
  selectCluster: selectClusterOfMA,
})(ShowClustersView);

export { ShowClusters };
