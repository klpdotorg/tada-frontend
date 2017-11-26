import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { Dashboard } from './components/Dashboard';
import { PrimaryDistrict } from './containers/PrimaryDistrict';
import { PrimaryBlock } from './containers/PrimaryBlock';
import { PrimaryCluster } from './containers/PrimaryCluster';
import { Institution } from './containers/Institution';
import { PreschoolProject } from './containers/PreschoolProject';
import { PreschoolCircle } from './containers/PreschoolCircle';
import { Preschool } from './containers/Preschool';
import { StudentGroup } from './containers/StudentGroup';
import { AddStudents } from './containers/AddStudents';
import { ViewStudents } from './containers/ViewStudents';
import Student from './components/Student';
import { LoginContainer } from './containers/Login';
import Logout from './components/Logout';
import { App } from './containers/Dashboard';
import UserRegContainer from './containers/UserRegContainer';
import { Programs } from './containers/Programs';
import { Questions } from './containers/Questions';
import AnswersContainer from './containers/AnswersContainer';
import ResetPassword from './components/ResetPassword';
import SetNewPassword from './components/SetNewPassword';
import Users from './containers/UsersContainer';
import PermissionsContainer from './containers/PermissionsContainer';
import Reports from './components/Reports';
import { Teachers } from './containers/Teachers';
import tadastore from './store';
import RevertEntity from './containers/RevertEntity';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, tadastore);

const isUserAuthenticated = (nextState, replace) => {
  let token = sessionStorage.getItem('token');
  // if (!token) {
  //   // redirect to login and set next location
  //   console.log(nextState, replace);
  //   if (nextState.location && nextState.location.pathname) {
  //     sessionStorage.setItem('nextUrl', nextState.location.pathname);
  //   }
  //   replace('/login');
  // }
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
        <Route path="programmes" component={Programs} />
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
        <Route
          path="district/:districtNodeId/project/:projectNodeId"
          component={PreschoolProject}
        />
        <Route
          path="district/:districtNodeId/project/:projectNodeId/circle/:circleNodeId"
          component={PreschoolCircle}
        />
        <Route
          path="district/:districtNodeId/project/:projectNodeId/circle/:circleNodeId/institution/:institutionNodeId"
          component={Preschool}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/teachers"
          component={Teachers}
        />
        <Route
          path="district/:districtNodeId/project/:projectNodeId/circle/:circleNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId"
          component={StudentGroup}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/studentgroup/:groupId/students"
          component={ViewStudents}
        />
        <Route
          path="district/:districtId/project/:projectId/circle/:circleId/institution/:institutionId/studentgroup/:groupId/addStudents"
          component={AddStudents}
        />
        <Route path="district/:districtNodeId" component={PrimaryDistrict} />
        <Route path="district/:districtNodeId/block/:blockNodeId" component={PrimaryBlock} />
        <Route
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId"
          component={PrimaryCluster}
        />
        <Route
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId/institution/:institutionNodeId"
          component={Institution}
        />
        <Route
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId/institution/:institutionNodeId/teachers"
          component={Teachers}
        />
        <Route
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId"
          component={StudentGroup}
        />
        <Route
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId/students"
          component={ViewStudents}
        />
        <Route
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId/addStudents"
          component={AddStudents}
        />
        <Route
          path="district/:districtId/block/:blockId/cluster/:clusterId/institution/:institutionId/studentgroups/:groupId/students/:studentId"
          component={Student}
        />
      </Route>
    </Router>
  </Provider>
);
