import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, includes, capitalize } from 'lodash';

import { Loading } from '../common';

const BoundaryListView = (props) => {
  const { loading, boundaries, selectedBoundaries } = props;

  return (
    <div className="col-md-6 permission-item-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="text-center table-header">
              Boundary
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            boundaries.map((boundary) => {
              const checked = includes(selectedBoundaries, boundary.uniqueId);
              return (
                <tr key={boundary.uniqueId}>
                  <td>
                    <span>{capitalize(boundary.value.name)}</span>
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      checked={checked}
                      onChange={(e) => {
                        props.onSelect(e.target.value);
                      }}
                    />
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
      {!loading && isEmpty(boundaries) ? (
        <div>
          <span>No Boundaries Found</span>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

BoundaryListView.propTypes = {
  loading: PropTypes.bool,
  boundaries: PropTypes.array,
  selectedBoundaries: PropTypes.array,
};

export { BoundaryListView };
