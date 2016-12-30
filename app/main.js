/* Main entry point for the app. Start here to understand the UI composition */
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('bootstrap/dist/css/bootstrap.css');
require('react-bootstrap-multiselect/css/bootstrap-multiselect.css')
require('bootstrap/dist/js/bootstrap.js');
require('font-awesome/css/font-awesome.css');
require('../assets/sass/lato.scss');
require('../assets/sass/style.scss');
require('../assets/custom.css');
require('jquery-validation');
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
import Preschool from './components/Preschool';
import StudentGroup from './components/StudentGroup' 
import Students from './components/Students'
import LoginContainer from './containers/LoginContainer';
import Logout from './components/Logout';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers/App';
import tadastore from './store';
import UserRegContainer from './containers/UserRegContainer';
import Programs from './components/Programs';
import ResetPassword from './components/ResetPassword';
import SetNewPassword from './components/SetNewPassword';
import Users from './containers/UsersContainer';


const history = syncHistoryWithStore(browserHistory, tadastore)



const routes = (
<Provider store={tadastore}>
  <Router history={history}>
    <Route path="login" component={ LoginContainer } />
    <Route path="logout" component={ Logout } />
    <Route path="password/reset" component={ ResetPassword }/>
    <Route path="password/reset/confirm/:uid/:token" component={ SetNewPassword }/>
    <Route path="register" component= {UserRegContainer}/>
    <Route path="/" component={App}>
      <IndexRoute component={ Dashboard } />
      <Route path="dashboard" component={ Dashboard } />
      <Route path="programs" component={ Programs }/>
      <Route path="users" component={ Users }/>
      <Route path="district/:districtId/project/:projectId" component={ PreschoolProject } />
      <Route path="district/:districtId/project/:projectId/circle/:circleId" component={ PreschoolCircle } />
      <Route path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId" component={ Preschool } />
      <Route path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/studentgroups/:groupId" component={ StudentGroup } />
      <Route path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/studentgroups/:groupId/students" component={ Students } />
      <Route path="district/:districtId" component={ PrimaryDistrict } />
      <Route path="district/:districtId/block/:blockId" component={ PrimaryBlock } />
      <Route path="district/:districtId/block/:blockId/cluster/:clusterId" component={ PrimaryCluster } />
      <Route path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId" component={ Institution } />
      <Route path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/studentgroups/:groupId" component={ StudentGroup } />
      <Route path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/studentgroups/:groupId/student/:studentId" component={ Students} />
    </Route>
  </Router>
</Provider>
);

ReactDOM.render(routes, document.getElementById('application'));
