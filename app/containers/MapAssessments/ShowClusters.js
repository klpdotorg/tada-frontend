import { connect } from 'react-redux';
import { ShowClustersView } from '../../components/MapAssessments';

const mapStateToProps = () => {
  return {
    clusters: [],
    selectedClusters: [],
    selelctedAllClusters: false,
  };
};

const ShowClusters = connect(mapStateToProps, {
  selectAllCluster: () => {},
  selectCluster: () => {},
})(ShowClustersView);

export { ShowClusters };
