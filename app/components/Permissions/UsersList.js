import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';

const UserListView = (props) => {
  const { loading, users, selectedUsers } = props;
  return (
    <div className="col-md-6 permission-item-table">
      {loading ? (
        <div className="base-spacing" style={{ paddingLeft: 10 }}>
          <Loading />
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="text-center table-header">
                User
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

UserListView.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  loading: PropTypes.bool,
};

export { UserListView };
