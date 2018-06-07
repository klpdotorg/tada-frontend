import React from 'react';
import PropTypes from 'prop-types';

const UsersView = ({ users, selectedUsers, editUser, selectUser, resetPassword }) => {
  return (
    <tbody>
      {users.map((user) => {
        const checked = selectedUsers.includes(user.id);
        const groups = user.groups.map((item) => {
          if (typeof item === 'object') {
            return item.name;
          }

          return item;
        });

        return (
          <tr key={user.id}>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.id}</td>
            <td>{groups.join(', ')}</td>
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
                <span className="fa-passwd-reset fa-stack">
                  <i className="fa fa-undo fa-stack-1x" />
                  <i className="fa fa-lock fa-stack-1x" />
                </span>
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
