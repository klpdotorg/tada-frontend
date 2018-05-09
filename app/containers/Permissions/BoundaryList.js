import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { BoundaryListView } from '../../components/Permissions';
import { fetchBoundariesForPermission } from '../../actions';

class FetchBoundaries extends Component {
  componentDidMount() {
    this.fetchResources(this.props.boundary);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boundary.id !== this.props.boundary.id) {
      this.fetchResources(nextProps.boundary);
    }
  }

  fetchResources = (boundary) => {
    const { district, boundaryId } = this.props;

    if (!isEmpty(boundary)) {
      this.props.fetchBoundary(
        {
          id: boundary.id,
          depth: district ? 1 : 2,
          uniqueId: boundaryId,
        },
        [],
      );
    }
  };

  render() {
    return <BoundaryListView {...this.props} />;
  }
}

FetchBoundaries.propTypes = {
  district: PropTypes.bool,
  boundary: PropTypes.object,
  boundaryType: PropTypes.string,
  boundaryId: PropTypes.any,
  fetchBoundary: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { boundaryId, boundaryType } = ownProps;
  const district = boundaryType === 'district';
  const { boundaryDetails, boundariesByParentId } = state.boundaries;
  const boundary = get(boundaryDetails, boundaryId, {});
  const depth = district ? 1 : 2;
  const Ids = get(boundariesByParentId, depth, []);

  return {
    boundaries: Ids.map((id) => {
      return {
        uniqueId: id,
        value: boundaryDetails[id],
      };
    }),
    selectedBoundaries: [],
    loading: state.appstate.loadingBoundary,
    boundary,
    district,
  };
};

const BoundaryList = connect(mapStateToProps, {
  fetchBoundary: fetchBoundariesForPermission,
})(FetchBoundaries);

export { BoundaryList };
