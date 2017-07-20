import React from 'react';
import Dashboard from './components/Dashboard';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import PrimaryDistrict from './components/PrimaryDistrict';
import PrimaryBlock from './components/PrimaryBlockScreen';
import PrimaryCluster from './components/PrimaryClusterScreen';
import PreschoolProject from './components/PreschoolProjectScreen';
import PreschoolCircle from './components/PreschoolCircleScreen';
import Institution from './components/InstitutionDetailsScreen';
import Preschool from './components/Preschool';
import StudentGroup from './components/StudentGroup';
import Students from './components/Students';
import Student from './components/Student';
import LoginContainer from './containers/LoginContainer';
import Logout from './components/Logout';
import App from './containers/App';
import UserRegContainer from './containers/UserRegContainer';
import Programs from './components/Programs';
import AnswersContainer from './containers/AnswersContainer';
import ResetPassword from './components/ResetPassword';
import SetNewPassword from './components/SetNewPassword';
import Users from './containers/UsersContainer';
import PermissionsContainer from './containers/PermissionsContainer';
import Questions from './components/AssessmentQuestions';
import Reports from './components/Reports';
import Teachers from './containers/Teachers';
import tadastore from './store';
import RevertEntity from './containers/RevertEntity';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, tadastore);

const isUserAuthenticated = (nextState, replace) => {
  let token = sessionStorage.getItem('token');
  if (token) {
    // Allow user to proceed
    console.log('User is authorized');
  } else {
    // redirect to login
    replace('/login');
  }
};

export const routes = (
  <Provider store={tadastore}>
    <Router history={history}>
      <Route path="login" component={LoginContainer} />
      <Route path="logout" component={Logout} />
      <Route path="password/reset" component={ResetPassword} />
      <Route path="password/reset/confirm/:uid/:token" component={SetNewPassword} />
      <Route path="register" component={UserRegContainer} />
      <Route path="/" component={App} onEnter={isUserAuthenticated}>
        <IndexRoute component={Dashboard} onEnter={isUserAuthenticated} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="programs" component={Programs} />
        <Route path="filterprograms" component={AnswersContainer} />
        <Route path="reports" component={Reports} />
        <Route path="revert-entity/:entityName" component={RevertEntity} />
        <Route path="programs/:programId" component={Programs} />
        <Route
          path="programs/:programId/assessments/:assessmentId/questions"
          component={Questions}
        />
        <Route path="users" component={Users} />
        <Route path="permissions" component={PermissionsContainer} />
        <Route path="district/:districtId/project/:projectId" component={PreschoolProject} />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId"
          component={PreschoolCircle}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId"
          component={Preschool}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/teachers"
          component={Teachers}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/studentgroups/:groupId"
          component={StudentGroup}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/studentgroups/:groupId/students"
          component={Students}
        />
        <Route path="district/:districtId" component={PrimaryDistrict} />
        <Route path="district/:districtId/block/:blockId" component={PrimaryBlock} />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId"
          component={PrimaryCluster}
        />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId"
          component={Institution}
        />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/teachers"
          component={Teachers}
        />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/studentgroups/:groupId"
          component={StudentGroup}
        />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/studentgroups/:groupId/students"
          component={Students}
        />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/studentgroups/:groupId/students/:studentId"
          component={Student}
        />
      </Route>
    </Router>
  </Provider>
);
