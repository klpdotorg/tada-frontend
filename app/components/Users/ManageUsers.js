import React from 'react';
import PropTypes from 'prop-types';

import {
  Users,
  Actions,
  AddUser,
  EditUser,
  Pagination,
  ResetUserPassword,
} from '../../containers/Users';
import { Header } from './index';
import { Loading, Message } from '../common';

const ManageUsersView = (props) => {
  const { loading, showAddUserModal, hasUsers } = props;
  return (
    <div>
      <div className="content-rigth user-page-header">
        <div className="user-search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search User"
            style={{ marginRight: 10 }}
            onChange={(e) => {
              props.onChangeText(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                props.submit();
              }
            }}
          />
          <button className="btn btn-primary" onClick={props.submit}>
            Search
          </button>
        </div>
        <button className="btn btn-orange" onClick={showAddUserModal}>
          Add User
        </button>
      </div>
      <Header />
      <div className="users-cont">
        <table className="table users-table">
          <thead className="users-thead">
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">UserID</th>
              <th scope="col">User Roles</th>
              <th scope="col">Select</th>
              <th scope="col">Edit</th>
              <th scope="col">Reset</th>
            </tr>
          </thead>
          {loading ? <tbody /> : <Users />}
        </table>
        {hasUsers || loading ? (
          <span />
        ) : (
          <div className="text-center users-loading">
            <Message message="No users found!" />
          </div>
        )}
        {loading ? (
          <div className="text-center users-loading">
            <Loading />
          </div>
        ) : (
          <span />
        )}
      </div>
      <div className="users-actions">
        <Pagination />
        <Actions />
      </div>
      <AddUser />
      <EditUser />
      <ResetUserPassword />
    </div>
  );
};

ManageUsersView.propTypes = {
  loading: PropTypes.bool,
  showAddUserModal: PropTypes.func,
  onChangeText: PropTypes.func,
  submit: PropTypes.func,
};

export { ManageUsersView };
