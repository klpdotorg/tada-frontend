import { connect } from 'react-redux';
import { UsersView } from '../../components/Users';

const mapStateToProps = (state) => {
  const { users } = state.users;
  return {
    users,
  };
};

const Users = connect(mapStateToProps)(UsersView);

export { Users };
