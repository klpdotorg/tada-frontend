import ManageUsers from '../components/ManageUsers';
import { connect } from 'react-redux';
import { createUser, listUsers, deleteUser } from '../actions/';
import { push } from 'react-router-redux';


const mapStateToProps = (state, ownProps) => {
  return {
    usersById: state.users.usersById,
    userCount: state.users.userCount,
    usersByPage: state.users.pages
  }
}

const UsersContainer = connect(mapStateToProps)(ManageUsers);

export default UsersContainer;
