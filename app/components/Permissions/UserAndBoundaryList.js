import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import isEmpty from 'lodash.isempty';

import { Loading } from '../common';
import { Pagination } from '../../containers/Users';

const UserAndBoundaryListView = (props) => {
  const {
    users,
    selectedUsers,
    selectedBoundaries,
    boundaries,
    indexes,
    userLoading,
    loadingBoundary,
  } = props;

  return (
    <div className="col-md-12 permission-item-table">
      <div className="user-search-bar permission-user-search">
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
      <div className="col-md-6 remove-margin-padding">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center table-header">
                User
              </th>
            </tr>
          </thead>
          <tbody>
            {userLoading ? (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            ) : (
              indexes.map((index) => {
                const user = get(users, index, {});
                const name = `${user.first_name || ''} ${user.last_name || ''}`;
                const userChecked = selectedUsers.includes(user.id);
                return (
                  <tr key={index}>
                    <td>
                      <span>{capitalize(name.trim() ? name : '')}</span>
                      {!isEmpty(user) ? (
                        <input
                          type="checkbox"
                          className="select-checkbox"
                          checked={userChecked}
                          onChange={() => {
                            props.selectUser(user.id);
                          }}
                        />
                      ) : (
                        <span style={{ height: 20 }} />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="col-md-6 remove-margin-padding">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center table-header">
                Boundary
              </th>
            </tr>
          </thead>
          <tbody>
            {loadingBoundary ? (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            ) : (
              indexes.map((index) => {
                const boundary = get(boundaries, [index, 'value'], {});
                const boundaryChecked = selectedBoundaries.includes(boundary.id);
                return (
                  <tr key={index}>
                    <td>
                      <span>{capitalize(boundary.name || '')}</span>
                      {!isEmpty(boundary) ? (
                        <input
                          type="checkbox"
                          className="select-checkbox"
                          checked={boundaryChecked}
                          onChange={() => {
                            props.selectBoundary(boundary.id);
                          }}
                        />
                      ) : (
                        <span />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

UserAndBoundaryListView.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  userLoading: PropTypes.bool,
  loadingBoundary: PropTypes.bool,
  boundaries: PropTypes.array,
  selectedBoundaries: PropTypes.array,
  indexes: PropTypes.array,
  onChangeText: PropTypes.func,
  submit: PropTypes.func,
};

export { UserAndBoundaryListView };
