import { connect } from 'react-redux';
import get from 'lodash.get';
import Loadable from 'react-loadable';

import { selectClusterOfMA, selectAllClustersOfMA } from '../../actions';
import { Loading } from '../../components/common';

const ShowClustersView = Loadable({
  loader: () => {
    return import('../../components/MapAssessments/ShowClusters');
  },
  loading: Loading,
});

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
