import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { reducer as notifications } from 'react-notification-system-redux';

import {
  SchoolSelection,
  Login,
  Modal,
  userregistration,
  Programs,
  Assessments,
  // PasswordReset,
  Users,
  // boundaries,
  AppState,
  Teachers,
  Header,
  Institution,
  AddStudents,
  Students,
  Languages,
  Questions,
  ProgramDetails,
  AssessmentEntry,
  BoundariesNavTree,
  MapAssessments,
  Confirm,
  EditStudents,
  Centers,
  OTP,
  Profile,
  ChangePassword,
} from './reducers';

const reducer = combineReducers({
  schoolSelection: SchoolSelection,
  login: Login,
  routing: routerReducer,
  notifications,
  modal: Modal,
  userregistration,
  users: Users,
  programs: Programs,
  assessments: Assessments,
  teachers: Teachers,
  // passwordreset: PasswordReset,
  boundaries: BoundariesNavTree,
  appstate: AppState,
  header: Header,
  institution: Institution,
  addStudents: AddStudents,
  students: Students,
  languages: Languages,
  questions: Questions,
  programDetails: ProgramDetails,
  assessmentEntry: AssessmentEntry,
  mapAssessments: MapAssessments,
  confirm: Confirm,
  editStudents: EditStudents,
  centers: Centers,
  otp: OTP,
  profile: Profile,
  changePassword: ChangePassword,
});

const middleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(promiseMiddleware()),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => {
      return f;
    },
)(createStore);

export default middleware(reducer);
