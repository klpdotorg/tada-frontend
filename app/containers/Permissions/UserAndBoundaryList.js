import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

import {
  fetchUsers,
  fetchBoundariesForPermission,
  selectPermissionsBoundary,
  selectPermissionsUser,
} from '../../actions';
import { UserAndBoundaryListView } from '../../components/Permissions';

class GetResources extends Component {
  componentDidMount() {
    this.props.fetchUsers();
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
    return <UserAndBoundaryListView {...this.props} />;
  }
}

GetResources.propTypes = {
  fetchUsers: PropTypes.func,
  fetchBoundary: PropTypes.func,
  boundary: PropTypes.object,
  district: PropTypes.bool,
  boundaryId: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
  const { users, loading } = state.users;
  const { selectedUsers, selectedBoundaries } = state.permissions;
  const { boundaryId, boundaryType } = ownProps;
  const district = boundaryType === 'district';
  const { boundaryDetails, boundariesByParentId } = state.boundaries;
  const boundary = get(boundaryDetails, boundaryId, {});
  const depth = district ? 1 : 2;
  const Ids = get(boundariesByParentId, depth, []);
  const usersValues = Object.values(users);
  const greater = usersValues.length > Ids.length ? usersValues.length : Ids.length;
  const indexes = [...Array(greater).keys()];
  return {
    users: usersValues,
    selectedUsers,
    boundaries: Ids.map((id) => {
      return {
        uniqueId: id,
        value: boundaryDetails[id],
      };
    }),
    selectedBoundaries,
    loadingBoundary: state.appstate.loadingBoundary,
    userLoading: loading,
    boundary,
    district,
    indexes,
  };
};

const UserAndBoundaryList = connect(mapStateToProps, {
  fetchUsers,
  fetchBoundary: fetchBoundariesForPermission,
  selectUser: selectPermissionsUser,
  selectBoundary: selectPermissionsBoundary,
})(GetResources);

export { UserAndBoundaryList };
