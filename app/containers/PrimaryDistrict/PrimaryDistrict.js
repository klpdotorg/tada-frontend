import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { DEFAULT_PARENT_NODE_ID } from 'config';

import { PrimaryDistrictView } from '../../components/PrimaryDistrict';
import { getBoundariesEntities } from '../../actions';

class GetEntity extends Component {
  componentDidMount() {
    const { district, districtNodeId } = this.props;

    if (isEmpty(district)) {
      const entities = [DEFAULT_PARENT_NODE_ID, districtNodeId].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }
  }

  render() {
    return <PrimaryDistrictView {...this.props} />;
  }
}

GetEntity.propTypes = {
  district: PropTypes.object,
  districtNodeId: PropTypes.number,
  getBoundariesEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { districtNodeId } = ownProps.params;
  const { isAdmin } = state.profile;

  return {
    district: state.boundaries.boundaryDetails[districtNodeId],
    districtNodeId,
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
  };
};

const PrimaryDistrict = connect(mapStateToProps, { getBoundariesEntities })(PrimaryDistrictView);

export default PrimaryDistrict;
