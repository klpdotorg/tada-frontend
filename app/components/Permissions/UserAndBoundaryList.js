import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import isEmpty from 'lodash.isempty';

import { Loading } from '../common';

const UserAndBoundaryListView = (props) => {
  const { loading, users, selectedUsers, selectedBoundaries, boundaries, indexes } = props;

  return (
    <div className="col-md-12 permission-item-table">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center table-header">
              User
            </th>
            <th scope="col" className="text-center table-header">
              Boundary
            </th>
          </tr>
        </thead>
        <tbody>
          {indexes.map((index) => {
            const user = get(users, index, {});
            const boundary = get(boundaries, [index, 'value'], {});
            const name = `${user.first_name || ''} ${user.last_name || ''}`;
            const userChecked = selectedUsers.includes(user.id);
            const boundaryChecked = selectedBoundaries.includes(boundary.id);
            return (
              <tr key={index}>
                <td>
                  <span>{capitalize(name.trim() ? name : '  ')}</span>
                  {!isEmpty(user) ? (
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      checked={userChecked}
                      onChange={(e) => {
                        props.selectUser(user.id);
                      }}
                    />
                  ) : (
                    <span />
                  )}
                </td>
                <td>
                  <span>{capitalize(boundary.name || '')}</span>
                  {!isEmpty(boundary) ? (
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      checked={boundaryChecked}
                      onChange={(e) => {
                        props.selectBoundary(boundary.id);
                      }}
                    />
                  ) : (
                    <span />
                  )}
                </td>
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
    </div>
  );
};

UserAndBoundaryListView.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  loading: PropTypes.bool,
  boundaries: PropTypes.array,
  selectedBoundaries: PropTypes.array,
  indexes: PropTypes.array,
};

export { UserAndBoundaryListView };
