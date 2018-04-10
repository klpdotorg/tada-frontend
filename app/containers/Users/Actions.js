import { connect } from 'react-redux';
import { ActionsView } from '../../components/Users';
import { deleteUsers } from '../../actions';

const Actions = connect(null, { deleteUsers })(ActionsView);

export { Actions };
