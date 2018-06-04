import React from 'react';
import PropTypes from 'prop-types';

const UsersView = ({ users, selectedUsers, editUser, selectUser, resetPassword }) => {
  return (
    <tbody>
      {users.map((user) => {
        const checked = selectedUsers.includes(user.id);

        return (
          <tr key={user.id}>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.id}</td>
            <td>{user.groups.join(', ')}</td>
            <td>
              <input
                checked={checked}
                onChange={() => {
                  selectUser(user.id);
                }}
                type="checkbox"
              />
            </td>
            <td>
              <button
                className="btn btn-primary padded-btn"
                data-toggle="tooltip"
                title="Edit"
                onClick={() => {
                  editUser(user.id);
                }}
              >
                <i className="fa fa-pencil-square-o" />
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary padded-btn"
                data-toggle="tooltip"
                title="Reset"
                onClick={() => {
                  resetPassword(user.id);
                }}
              >
                <i className="fa fa-pencil-square-o" />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

UsersView.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  editUser: PropTypes.func,
  selectUser: PropTypes.func,
  resetPassword: PropTypes.func,
};

export { UsersView };
