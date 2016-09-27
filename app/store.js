import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { schoolSelection, entities, login, modal, userregistration, programs, assessments } from './reducers/TadaReducers';

const reducer = combineReducers({
  schoolSelection,
  entities,
  login,
  routing: routerReducer,
  modal,
  userregistration,
  programs,
  assessments
});

const middleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

export default middleware(reducer);
