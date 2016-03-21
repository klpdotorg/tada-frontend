/* Main entry point for the app. Start here to understand the UI composition */
require('../assets/sass/lato.scss');
require('../assets/sass/style.scss');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
import React from 'react';
import ReactDOM from 'react-dom';
import auth from './components/Auth';
import Dashboard from './components/Dashboard';

import {DefaultRoute, Router, Link, Route, RouteHandler, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import PrimaryDistrict from './components/PrimaryDistrictScreen';
import PrimaryBlock from './components/PrimaryBlockScreen';
import PrimaryCluster from './components/PrimaryClusterScreen';
import PreschoolProject from './components/PreschoolProjectScreen';
import PreschoolCircle from './components/PreschoolCircleScreen';
import Institution from './components/InstitutionDetailsScreen';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Login from './components/LoginForm';
import HeaderBar from './components/MainHeader';
import TreeTogglerSpacingDiv from './components/TreeTogglerSpacingDiv';
import TadaContainer from './components/TadaContainer';
import Logout from './components/Logout';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';
import * as reducers from './reducers/TadaReducers';

const browserHistory = createBrowserHistory()

var App = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount: function()
  {

      //auth.onChange = this.updateAuth;
      //auth.login();
    },

    componentDidMount: function() {
      console.log('app component did mount. much wow');
      auth.onChange = this.updateAuth;
    },



    componentWillReceiveProps: function(newProps) {
      console.log('app container will receive props', arguments);
      console.log('thisProps', this.props.params);
      console.log('thisState', this.state);
      console.log('just this', this);
      console.log('app children', this.props.children);
    },

    render: function()
    {
      return (
        <div>
        <HeaderBar/>
        <TreeTogglerSpacingDiv/>
        <TadaContainer children={this.props.children}/>

        </div>
        );
    }
  });





var requireAuthentication = function requireAuth(nextState, replaceState)
{
  if (!auth.loggedIn())
  {
    console.log("NEXT STATE:", nextState.location.pathname);
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
  console.log("NEXT STATE:" , nextState.location.pathname);
}

function createTadaStore() {
  var reducer = combineReducers({...reducers, routing: routerReducer});
  var finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
    var store = finalCreateStore(reducer);

    return store
}

  const tadastore = createTadaStore();

  const history = syncHistoryWithStore(browserHistory, tadastore)

  const routes = (
    <Provider store={tadastore}>
    <Router history={history}>
    <Route path="login" component={Login}/>
    <Route path="logout" component={Logout}/>
    <Route path="/" component={App} onEnter={requireAuthentication}>
    <IndexRoute component={Dashboard}/>
    <Route path="dashboard" component={Dashboard}/>
    <Route path="district/:districtId/project/:projectId" component={PreschoolProject}/>
    <Route path="district/:districtId/project/:projectId/circle/:circleId" component={PreschoolCircle}/>
    <Route path="district/:districtId" component={PrimaryDistrict}/>
    <Route path="district/:districtId/block/:blockId" component={PrimaryBlock}/>
    <Route path="district/:districtId/block/:blockId/cluster/:clusterId" component={PrimaryCluster}/>
    <Route path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId" component={Institution}/>

    </Route>
    </Router>
    </Provider>
    );


  ReactDOM.render(routes, document.getElementById('application'));

