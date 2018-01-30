import React from 'react';
import PropTypes from 'prop-types';
import { capitalize, includes } from 'lodash';

const ShowClustersView = (props) => {
  const { clusters, selectedClusters, selectedAllClusters } = props;

  // TODO Add loading for clusters

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
            onChange={props.selectAllClusters}
          />
        </span>
      </div>
      <ul className="list-group" style={{ overflowY: 'auto', maxHeight: '500px' }}>
        {clusters.map((cluster) => {
          const checked = includes(selectedClusters, cluster.id);

          return (
            <li className="list-group-item" key={cluster.id}>
              {capitalize(cluster.name)}
              <div className="pull-right">
                <input
                  type="checkbox"
                  aria-label="..."
                  checked={checked}
                  value={checked}
                  onChange={() => {
                    props.selectCluster(cluster.id);
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ShowClustersView.propTypes = {
  clusters: PropTypes.array,
  selectedClusters: PropTypes.array,
  selectAllClusters: PropTypes.func,
  selectCluster: PropTypes.func,
  selectedAllClusters: PropTypes.bool,
};

export { ShowClustersView };
