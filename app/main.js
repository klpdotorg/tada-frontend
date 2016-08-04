/* Main entry point for the app. Start here to understand the UI composition */
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('../assets/sass/lato.scss');
require('../assets/sass/style.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import PrimaryDistrict from './components/PrimaryDistrictScreen';
import PrimaryBlock from './components/PrimaryBlockScreen';
import PrimaryCluster from './components/PrimaryClusterScreen';
import PreschoolProject from './components/PreschoolProjectScreen';
import PreschoolCircle from './components/PreschoolCircleScreen';
import Institution from './components/InstitutionDetailsScreen';
import LoginContainer from './containers/LoginContainer';
import Logout from './components/Logout';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers/App';
import tadastore from './store';
import UserRegContainer from './containers/UserRegContainer';

const history = syncHistoryWithStore(browserHistory, tadastore)

const routes = (
<Provider store={tadastore}>
  <Router history={history}>
    <Route path="login" component={ LoginContainer } />
    <Route path="logout" component={ Logout } />
    <Route path="register" component= {UserRegContainer}/>
    <Route path="/" component={App}>
      <IndexRoute component={ Dashboard } />
      <Route path="dashboard" component={ Dashboard } />
      <Route path="district/:districtId/project/:projectId" component={ PreschoolProject } />
      <Route path="district/:districtId/project/:projectId/circle/:circleId" component={ PreschoolCircle } />
      <Route path="district/:districtId" component={ PrimaryDistrict } />
      <Route path="district/:districtId/block/:blockId" component={ PrimaryBlock } />
      <Route path="district/:districtId/block/:blockId/cluster/:clusterId" component={ PrimaryCluster } />
      <Route path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId" component={ Institution } />
    </Route>
  </Router>
</Provider>
);

ReactDOM.render(routes, document.getElementById('application'));
