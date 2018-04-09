import React from 'react';
import PropTypes from 'prop-types';

const UsersView = ({ users }) => {
  return (
    <tbody>
      {users.map((user) => {
        return (
          <tr key={user.id}>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.id}</td>
            <td>{user.user_type}</td>
            <td>
              <input
                checked={false}
                onChange={() => {
                  // props.selectAssessment(assessment.id);
                }}
                type="checkbox"
              />
            </td>
            <td>
              <button className="btn btn-primary padded-btn" data-toggle="tooltip" title="Edit">
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
};

export { UsersView };
