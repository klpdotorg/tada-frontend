/* Main entry point for the app. Start here to understand the UI composition */
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('../assets/sass/lato.scss');
require('../assets/sass/style.scss');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import { DefaultRoute, Router, Link, Route, RouteHandler, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import PrimaryDistrict from './components/PrimaryDistrictScreen';
import PrimaryBlock from './components/PrimaryBlockScreen';
import PrimaryCluster from './components/PrimaryClusterScreen';
import PreschoolProject from './components/PreschoolProjectScreen';
import PreschoolCircle from './components/PreschoolCircleScreen';
import Institution from './components/InstitutionDetailsScreen';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import LoginContainer from './containers/LoginContainer';
import HeaderBar from './components/MainHeader';
import TreeTogglerSpacingDiv from './components/TreeTogglerSpacingDiv';
import TadaContainer from './components/TadaContainer';
import Logout from './components/Logout';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';
import { schoolSelection, entities, login, modal } from './reducers/TadaReducers';
import TadaContentContainer from './containers/TadaContentContainer';
//const browserHistory = createBrowserHistory()
import fetch from 'isomorphic-fetch'

class App extends Component {

  componentDidMount() {
    console.log('app component did mount. much wow');
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div>
        <HeaderBar/>
        <TreeTogglerSpacingDiv/>
        <TadaContentContainer children={ this.props.children } />
      </div>
      );
  }
}

function createTadaStore() {
  var reducer = combineReducers({
    schoolSelection,
    entities,
    login,
    routing: routerReducer,
    modal
  });

  var finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  var store = finalCreateStore(reducer);
  console.log('Tada store created..');
  return store
}

const tadastore = createTadaStore();

const history = syncHistoryWithStore(browserHistory, tadastore)

var requireAuthentication = function requireAuth(nextState, replace) {
  if (!sessionStorage.getItem('token')) {
    replace('/login');
  }
}

const routes = (
<Provider store={ tadastore }>
  <Router history={ history }>
    <Route path="login" component={ LoginContainer } />
    <Route path="logout" component={ Logout } />
    <Route path="/" component={ App } onEnter={ requireAuthentication }>
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

