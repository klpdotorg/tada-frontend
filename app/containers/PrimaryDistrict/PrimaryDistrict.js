import { connect } from 'react-redux';
import { PrimaryDistrictView } from '../../components/PrimaryDistrict';

const mapStateToProps = (state, ownProps) => {
  const { districtId } = ownProps.params;

  return {
    name: state.boundaries.boundaryDetails[districtId].name,
    districtId,
  };
};

const PrimaryDistrict = connect(mapStateToProps)(PrimaryDistrictView);

export { PrimaryDistrict };
