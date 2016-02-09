/* Main entry point for the app. Start here to understand the UI composition */

require('../sass/style.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import auth from './components/Auth';
import { createStore } from 'redux';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import tada from './reducers/Tada';
import { DefaultRoute, Router, Link, Route, RouteHandler, IndexRoute } from 'react-router';
import PrimaryDistrict from './components/PrimaryDistrictScreen';
import PrimaryBlock from './components/PrimaryBlockScreen';
import PrimaryCluster from './components/PrimaryClusterScreen';
import Institution from './components/InstitutionDetailsScreen';
import createHistory from 'history/lib/createHashHistory';
import Login from './components/LoginForm';
import TestComp from './components/TestAuth';
import HeaderBar from './components/MainHeader';
import TreeTogglerSpacingDiv from './components/TreeTogglerSpacingDiv';
import TadaContainer from './components/TadaContainer';
import Logout from './components/Logout';



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
      console.log("*******LANDING PAGE WILL MOUNT********");
      auth.onChange = this.updateAuth;
      auth.login();
  },
  
  componentDidMount: function() {
        console.log('app component did mount. much wow');
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
    console.log('app container props', this.props.children)
    return (
      <div>
        <HeaderBar/>
        <TreeTogglerSpacingDiv/>
        <TadaContainer children={this.props.children}/>
        
      </div>
    );
  }
});

let store = createStore(tada);

const history = createHistory({
    queryKey: false
});



var requireAuthentication = function requireAuth(nextState, replaceState) 
{
  console.log("****************INSIDE REQURIE AUTH***************************");
  if (!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

const routes = (
    <Router history={history}>
        <Route path="test" component={TestComp}/>
        <Route path="login" component={Login}/>
        <Route path="logout" component={Logout}/>
        <Route path="/" component={App} onEnter={requireAuthentication}>
            <IndexRoute component={Dashboard}/>            
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

