import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

import { PermissionsView } from '../../components/Permissions';
import { getBoundariesEntities } from '../../actions';

class FetchBlocks extends Component {
  componentWillReceiveProps(nextProps) {
    const { find, district, params } = this.props;
    const id = get(district, 'id', '');
    const newId = get(nextProps.district, 'id', '');
    if (!isEmpty(nextProps.district)) {
      if (find && id !== newId) {
        this.props.getBoundariesEntities([
          {
            id: newId,
            depth: 1,
            uniqueId: params.districtId,
          },
          {
            uniqueId: params.blockId,
            depth: 2,
          },
        ]);
      }
    }
  }

  render() {
    return <PermissionsView {...this.props} />;
  }
}

FetchBlocks.propTypes = {
  find: PropTypes.bool,
  district: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
  districtId: PropTypes.any,
  params: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { districtId, blockId } = ownProps.params;
  const { boundaryDetails } = state.boundaries;
  const district = get(boundaryDetails, districtId, {});
  const find = get(boundaryDetails, blockId, {});
  const { loadingBoundary } = state.appstate;
  return {
    loading: loadingBoundary, // isEmpty(boundaries),
    district,
    boundaryType: 'block',
    boundaryId: blockId,
    find: isEmpty(find),
  };
};

const BlockPermissions = connect(mapStateToProps, { getBoundariesEntities })(FetchBlocks);

export { BlockPermissions };
