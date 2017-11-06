import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import {
  SchoolSelection,
  Login,
  Modal,
  userregistration,
  programs,
  assessments,
  PasswordReset,
  users,
  boundaries,
  AppState,
  teachers,
  Header,
  Institution,
  AddStudents,
} from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { reducer as notifications } from 'react-notification-system-redux';

const reducer = combineReducers({
  schoolSelection: SchoolSelection,
  login: Login,
  routing: routerReducer,
  notifications,
  modal: Modal,
  userregistration,
  users,
  programs,
  assessments,
  teachers,
  passwordreset: PasswordReset,
  boundaries,
  appstate: AppState,
  header: Header,
  institution: Institution,
  addStudents: AddStudents,
});

const middleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(promiseMiddleware()),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

export default middleware(reducer);
