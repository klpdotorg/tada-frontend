import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash.capitalize';
import includes from 'lodash.includes';
import isEqual from 'lodash.isequal';

import { Loading } from '../common';

const ShowClustersView = (props) => {
  const { clusters, selectedClusters, loading } = props;
  const Ids = clusters.map((cluster) => {
    return cluster.uniqueId;
  });

  const selectedAllClusters = isEqual(Ids, selectedClusters);

  return (
    <div className="panel panel-primary">
      <div className="panel-heading ma-boundary-heading">
        <h3 className="panel-title ma-boundary-title">Boundary</h3>
        <span className="ma-boundary-selectAll">
          All{' '}
          <input
            type="checkbox"
            className="ma-boundary-checkbox"
            checked={selectedAllClusters}
            onChange={() => {
              const entities = clusters.map((cluster) => {
                return {
                  id: cluster.value.id,
                  uniqueId: cluster.uniqueId,
                };
              });
              props.selectAllClusters(entities);
            }}
          />
        </span>
      </div>
      {loading ? (
        <div className="base-spacing" style={{ paddingLeft: 10 }}>
          <Loading />
        </div>
      ) : (
        <ul className="list-group" style={{ overflowY: 'auto', maxHeight: '500px' }}>
          {clusters.map((cluster) => {
            const checked = includes(selectedClusters, cluster.uniqueId);

            return (
              <li className="list-group-item" key={cluster.uniqueId}>
                {capitalize(cluster.value.name)}
                <div className="pull-right">
                  <input
                    type="checkbox"
                    aria-label="..."
                    checked={checked}
                    value={checked}
                    onChange={() => {
                      props.selectCluster({
                        id: cluster.value.id,
                        uniqueId: cluster.uniqueId,
                        depth: 3,
                      });
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

ShowClustersView.propTypes = {
  clusters: PropTypes.array,
  selectedClusters: PropTypes.array,
  selectAllClusters: PropTypes.func,
  selectCluster: PropTypes.func,
  selectedAllClusters: PropTypes.bool,
  loading: PropTypes.bool,
};

export { ShowClustersView };
