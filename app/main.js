/* Main entry point for the app. Start here to understand the UI composition */

require('../sass/style.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './components/Application';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import tada from './reducers/Tada';
import { DefaultRoute, Router, Link, Route, RouteHandler, IndexRoute } from 'react-router';
import PrimaryDistrict from './components/PrimaryDistrictScreen';
import PrimaryBlock from './components/PrimaryBlockScreen';
import PrimaryCluster from './components/PrimaryClusterScreen';
import Institution from './components/InstitutionDetailsScreen';
import createHistory from 'history/lib/createHashHistory';

let store = createStore(tada);

const history = createHistory({
    queryKey: false
});

const routes = (
    <Router history={history}>

        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
            <Route path="dashboard" component={Dashboard}/>
            <Route path="district/:districtId" component={PrimaryDistrict}/>
            <Route path="district/:districtId/block/:blockId" component={PrimaryBlock}/>
            <Route path="district/:districtId/block/:blockId/cluster/:clusterId" component={PrimaryCluster}/>
            <Route path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId" component={Institution}/>

        </Route>
    </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('application')
  );

ReactDOM.render(routes, document.getElementById('application'));

