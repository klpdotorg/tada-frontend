/* Main entry point for the app. Start here to understand the UI composition */

/* This line is needed. Else see warnings about not using React.render even though it is not being used
*/
'use strict'

require('../sass/style.scss');
import ReactDOM from 'react';
import App from './Application';



console.log('inside entry.js');
ReactDOM.render(<App/>, document.getElementById('application'));
console.log('Done rendering')