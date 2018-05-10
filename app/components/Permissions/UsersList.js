import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { Loading } from '../common';

const UserListView = (props) => {
  const { loading, users, selectedUsers } = props;
  return (
    <div className="col-md-6 permission-item-table">
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
            const name = `${user.first_name} ${user.last_name}`;
            return (
              <tr key={user.id}>
                <td>{name || '  '}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading ? (
        <div className="base-spacing" style={{ paddingLeft: 10 }}>
          <Loading />
        </div>
      ) : (
        <div />
      )}
      {!loading && isEmpty(users) ? (
        <div>
          <span>No Boundaries Found</span>
        </div>
      ) : (
        <div />
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
