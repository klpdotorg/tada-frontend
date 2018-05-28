import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ManageUsersView } from '../../components/Users';
import { fetchUsers, toggleAddUserModal } from '../../actions';

class FetchUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers(); // Fetching all the users
  }
  render() {
    return <ManageUsersView {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { loading } = state.users;

  return {
    loading,
  };
};

FetchUsers.propTypes = {
  fetchUsers: PropTypes.func,
};

const ManageUsers = connect(mapStateToProps, {
  fetchUsers,
  showAddUserModal: toggleAddUserModal,
})(FetchUsers);

export { ManageUsers };
