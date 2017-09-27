import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import {
  schoolSelection,
  login,
  modal,
  userregistration,
  programs,
  assessments,
  passwordreset,
  users,
  boundaries,
  appstate,
  teachers,
  Header,
} from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { reducer as notifications } from 'react-notification-system-redux';

const reducer = combineReducers({
  schoolSelection,
  login,
  routing: routerReducer,
  notifications,
  modal,
  userregistration,
  users,
  programs,
  assessments,
  teachers,
  passwordreset,
  boundaries,
  appstate,
  header: Header,
});

const middleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(promiseMiddleware()),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

export default middleware(reducer);
