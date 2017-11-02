import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';

import { PrimaryDistrictView } from '../../components/PrimaryDistrict';
import { getEntities } from '../../actions';

class GetEntity extends Component {
  componentDidMount() {
    const { district, districtNodeId } = this.props;

    if (isEmpty(district)) {
      this.props.getEntities([DEFAULT_PARENT_NODE_ID, districtNodeId]);
    }
  }

  render() {
    return <PrimaryDistrictView {...this.props} />;
  }
}

GetEntity.propTypes = {
  district: PropTypes.object,
  districtNodeId: PropTypes.number,
  getEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { districtNodeId } = ownProps.params;

  return {
    district: state.boundaries.boundaryDetails[districtNodeId],
    districtNodeId,
  };
};

const PrimaryDistrict = connect(mapStateToProps, { getEntities })(PrimaryDistrictView);

export { PrimaryDistrict };
