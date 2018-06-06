import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { ManageUsersView } from '../../components/Users';
import {
  fetchUsers,
  toggleAddUserModal,
  onChangeUserSearchText,
  submitUserSearch,
} from '../../actions';

class FetchUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers(); // Fetching all the users
  }
  render() {
    return <ManageUsersView {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { loading, users } = state.users;

  return {
    loading,
    hasUsers: !isEmpty(users),
  };
};

FetchUsers.propTypes = {
  fetchUsers: PropTypes.func,
};

const ManageUsers = connect(mapStateToProps, {
  fetchUsers,
  showAddUserModal: toggleAddUserModal,
  onChangeText: onChangeUserSearchText,
  submit: submitUserSearch,
})(FetchUsers);

export default ManageUsers;
