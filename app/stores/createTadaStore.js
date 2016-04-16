import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from '../reducers/TadaReducers';
export default function() {
  var reducer = combineReducers(reducers);
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);
  var store = finalCreateStore(reducer);

  return store
}