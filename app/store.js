import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { schoolSelection, entities, login, modal } from './reducers/TadaReducers';


const reducer = combineReducers({
  schoolSelection,
  entities,
  login,
  routing: routerReducer,
  modal,
});

const middleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

export default middleware(reducer);
