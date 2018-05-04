import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUsers } from '../../actions';
import { UserListView } from '../../components/Permissions';

class GetUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return <UserListView {...this.props} />;
  }
}

GetUsers.propTypes = {
  fetchUsers: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { users, loading } = state.users;

  return {
    users: [],
    selectedUsers: [],
    loading: false,
  };
};

const UserList = connect(mapStateToProps, { fetchUsers })(GetUsers);

export { UserList };
