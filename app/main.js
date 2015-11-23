/* Main entry point for the app. Start here to understand the UI composition */

require('../sass/style.scss')
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './components/Application'
import { Provider } from 'react-redux'
import tada from './reducers/Tada'

let store = createStore(tada);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('application')
  );

