import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import get from 'lodash.get';
import { syncHistoryWithStore } from 'react-router-redux';

import tadastore from './store';

import { Programs } from './containers/Programs';
import { Questions } from './containers/Questions';
import { Teachers } from './containers/Teachers';
import { ViewStudents } from './containers/ViewStudents';
import { DistrictPermissions, BlockPermissions } from './containers/Permissions';
import RevertEntity from './containers/RevertEntity';
import { MapAssessments } from './containers/MapAssessments';
import { ManageUsers } from './containers/Users';
import {
  InstitutionAnswersSheet,
  StudentsAnswersSheet,
  StudentGroupAnswersSheet,
} from './containers/AssessmentEntry';
import { DefaultMessage } from './components/AssessmentEntry';
import { AssignPermissionMessage } from './components/Permissions';

const Loading = ({ error }) => {
  if (error) {
    return <div>Error: error</div>;
  }
  return <div>Loading...</div>;
};

const App = Loadable({
  loader: () => {
    return import('./containers/Dashboard/App');
  },
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => {
    return import('./components/Dashboard/Dashboard');
  },
  loading: Loading,
});

const PrimaryDistrict = Loadable({
  loader: () => {
    return import('./containers/PrimaryDistrict/PrimaryDistrict');
  },
  loading: Loading,
});

const PrimaryBlock = Loadable({
  loader: () => {
    return import('./containers/PrimaryBlock/PrimaryBlock');
  },
  loading: Loading,
});

const PrimaryCluster = Loadable({
  loader: () => {
    return import('./containers/PrimaryCluster/PrimaryCluster');
  },
  loading: Loading,
});

const Institution = Loadable({
  loader: () => {
    return import('./containers/Institution/Institution');
  },
  loading: Loading,
});

const PreschoolProject = Loadable({
  loader: () => {
    return import('./containers/PreschoolProject/PreschoolProject');
  },
  loading: Loading,
});

const PreschoolCircle = Loadable({
  loader: () => {
    return import('./containers/PreschoolCircle/PreschoolCircle');
  },
  loading: Loading,
});

const Preschool = Loadable({
  loader: () => {
    return import('./containers/Preschool/Preschool');
  },
  loading: Loading,
});

const StudentGroup = Loadable({
  loader: () => {
    return import('./containers/StudentGroup/StudentGroup');
  },
  loading: Loading,
});

const AddStudents = Loadable({
  loader: () => {
    return import('./containers/AddStudents/AddStudents');
  },
  loading: Loading,
});

const EditStudents = Loadable({
  loader: () => {
    return import('./containers/EditStudents/EditStudents');
  },
  loading: Loading,
});

const LoginContainer = Loadable({
  loader: () => {
    return import('./containers/Login/LoginContainer');
  },
  loading: Loading,
});

const Logout = Loadable({
  loader: () => {
    return import('./components/Logout');
  },
  loading: Loading,
});

const ResetPassword = Loadable({
  loader: () => {
    return import('./components/ResetPassword');
  },
  loading: Loading,
});

const SetNewPassword = Loadable({
  loader: () => {
    return import('./components/SetNewPassword');
  },
  loading: Loading,
});

const history = syncHistoryWithStore(browserHistory, tadastore);

const isUserAuthenticated = (nextState, replace) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!get(user, 'token')) {
    // redirect to login and set next location
    if (nextState.location && nextState.location.pathname) {
      sessionStorage.setItem('nextUrl', nextState.location.pathname);
    }
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
      <Route path="/" component={App} onEnter={isUserAuthenticated}>
        <IndexRoute component={Dashboard} onEnter={isUserAuthenticated} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="programmes" component={Programs} />
        <Route path="filterprograms" component={DefaultMessage} />
        <Route
          path="filterprograms/questiongroups/:questionGroupId/institutions/:institutionId"
          component={InstitutionAnswersSheet}
        />
        <Route
          path="filterprograms/questiongroups/:questionGroupId/studentgroups/:studentGroupId"
          component={StudentGroupAnswersSheet}
        />
        <Route
          path="filterprograms/questiongroups/:questionGroupId/students/:studentGroupId"
          component={StudentsAnswersSheet}
        />
        <Route path="mapassessments" component={MapAssessments} />
        <Route path="revert-entity/:entityName" component={RevertEntity} />
        <Route path="programs/:programId" component={Programs} />
        <Route
          path="programs/:programId/assessments/:assessmentId/questions"
          component={Questions}
        />
        <Route path="users" component={ManageUsers} />
        <Route path="permissions" component={AssignPermissionMessage} />
        <Route path="permissions/district/:districtId" component={DistrictPermissions} />
        <Route
          path="permissions/district/:districtId/block/:blockId"
          component={BlockPermissions}
        />
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
          path="district/:districtNodeId/project/:blockNodeId/circle/:clusterNodeId/institution/:institutionNodeId/teachers"
          component={Teachers}
        />
        <Route
          path="district/:districtNodeId/project/:blockNodeId/circle/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId"
          component={StudentGroup}
        />
        <Route
          path="district/:districtNodeId/project/:blockNodeId/circle/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId/students"
          component={ViewStudents}
        />
        <Route
          path="district/:districtNodeId/project/:blockNodeId/circle/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId/addStudents"
          component={AddStudents}
        />
        <Route
          path="district/:districtNodeId/project/:blockNodeId/circle/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId/editStudents"
          component={EditStudents}
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
          path="district/:districtNodeId/block/:blockNodeId/cluster/:clusterNodeId/institution/:institutionNodeId/studentgroup/:studentGroupNodeId/editStudents"
          component={EditStudents}
        />
      </Route>
    </Router>
  </Provider>
);
