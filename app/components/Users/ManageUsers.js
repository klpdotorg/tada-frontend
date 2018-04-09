import React from 'react';
import PropTypes from 'prop-types';

import { Users, Actions, AddUser } from '../../containers/Users';
import { Header } from './index';
import { Loading } from '../common';

const ManageUsersView = ({ loading, showAddUserModal }) => {
  return (
    <div>
      <div className="content-rigth user-page-header">
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
              <th scope="col">User Type</th>
              <th scope="col">Select</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <Users />
        </table>
        <div className="text-center users-loading">{loading ? <Loading /> : <span />}</div>
      </div>
      <Actions />
      <AddUser />
    </div>
  );
};

ManageUsersView.propTypes = {
  loading: PropTypes.bool,
  showAddUserModal: PropTypes.func,
};

export { ManageUsersView };
