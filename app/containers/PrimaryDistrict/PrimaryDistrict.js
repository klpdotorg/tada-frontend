import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DEFAULT_PARENT_ID } from 'config';

import { PrimaryDistrictView } from '../../components/PrimaryDistrict';
import { getEntities } from '../../actions';

class GetEntity extends Component {
  componentDidMount() {
    const { district, districtId } = this.props;

    if (district) {
      this.props.getEntities([DEFAULT_PARENT_ID, districtId]);
    }
  }

  render() {
    return <PrimaryDistrictView {...this.props} />;
  }
}

GetEntity.propTypes = {
  district: PropTypes.object,
  districtId: PropTypes.number,
  getEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { districtId } = ownProps.params;

  return {
    district: state.boundaries.boundaryDetails[districtId],
    districtId,
  };
};

const PrimaryDistrict = connect(mapStateToProps, { getEntities })(PrimaryDistrictView);

export { PrimaryDistrict };
