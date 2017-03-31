/* Main entry point for the app. Start here to understand the UI composition */
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('bootstrap/dist/css/bootstrap.css');
require('react-bootstrap-multiselect/css/bootstrap-multiselect.css')
require('bootstrap/dist/js/bootstrap.js');
require('font-awesome/css/font-awesome.css');
require('../assets/sass/lato.scss');
require('../assets/sass/style.scss');
require('../assets/custom.css');
require('jquery-validation');

import React from 'react';
import ReactDOM from 'react-dom';
import { routes } from './routes';

ReactDOM.render(routes, document.getElementById('application'));
