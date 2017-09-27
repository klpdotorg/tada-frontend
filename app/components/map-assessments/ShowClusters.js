import React from 'react';
import * as action from '../../actions';
import { includes, capitalize } from 'lodash';

export default class ShowCluster extends React.Component {
  selectCluster = (id, e) => {
    if (e.target.checked) {
      this.props.dispatch(action.selectMACluster(id));
      this.props.dispatch(action.fetchingMAInstitutions());
      action.getInstitutions(id).then(res => {
        this.props.dispatch(action.setMAInstitutions(res, true));
      });
    } else {
      this.props.dispatch(action.unselectMACluster(id));
    }
  };

  selectAllClusters = e => {
    if (e.target.checked) {
      this.props.dispatch(action.selectAllMAClusters());
      this.props.clusters.forEach(cluster => {
        this.props.dispatch(action.fetchingMAInstitutions());
        action.getInstitutions(cluster.id).then(res => {
          this.props.dispatch(action.setMAInstitutions(res, true));
        });
      });
    } else {
      this.props.dispatch(action.unselectAllMAClusters());
    }
  };

  render() {
    const { clusters, selectedClusters, fetchingClusters, selectAllClusters } = this.props;

    const clustersList = clusters.map((cluster, i) => {
      let checked = includes(selectedClusters, cluster.id);

      return (
        <li className="list-group-item" key={i}>
          {capitalize(cluster.name)}
          <div className="pull-right">
            <input
              type="checkbox"
              aria-label="..."
              checked={checked}
              value={checked}
              onChange={this.selectCluster.bind(null, cluster.id)}
            />
          </div>
        </li>
      );
    });

    return (
      <div className="row center-block">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading ma-boundary-heading">
              <h3 className="panel-title ma-boundary-title">Boundary</h3>
              <span className="ma-boundary-selectAll">
                All{' '}
                <input
                  type="checkbox"
                  className="ma-boundary-checkbox"
                  checked={selectAllClusters}
                  onChange={this.selectAllClusters}
                />
              </span>
            </div>
            {fetchingClusters
              ? <div className="panel-body">
                  <i className="fa fa-cog fa-spin fa-lg fa-fw" />
                  <span className="text-muted">Loading...</span>
                </div>
              : <ul className="list-group" style={{ overflowY: 'auto', maxHeight: '500px' }}>
                  {clustersList}
                </ul>}
          </div>
        </div>
      </div>
    );
  }
}
