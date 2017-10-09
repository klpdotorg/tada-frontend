import { connect } from 'react-redux';
import { PrimaryBlockView } from '../../components/PrimaryBlock';

const mapStateToProps = (state, ownProps) => {
  const { blockId, districtId } = ownProps.params;

  return {
    block: state.boundaries.boundaryDetails[blockId],
    district: state.boundaries.boundaryDetails[districtId],
    isLoading: state.appState.loadingBoundary,
  };
};

const PrimaryDistrict = connect(mapStateToProps)(PrimaryBlockView);

export { PrimaryDistrict };
