import ReactDOM from 'react-dom';
import { routes } from './routes';

require('./css/app.css');
require('./css/react-treeview.css');

ReactDOM.render(routes, document.getElementById('application'));
