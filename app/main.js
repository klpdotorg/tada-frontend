/* Main entry point for the app. Start here to understand the UI composition */

require('../sass/style.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Application';

console.log('inside entry.js');
ReactDOM.render(<App/>, document.getElementById('application'));

