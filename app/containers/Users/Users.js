import { connect } from 'react-redux';
import { UsersView } from '../../components/Users';
import { openEditUserModal, selectUser, toggleResetUserPasswordModal } from '../../actions';

const mapStateToProps = (state) => {
  const { users, selectedUsers } = state.users;
  return {
    users: Object.values(users),
    selectedUsers,
  };
};

const Users = connect(mapStateToProps, {
  editUser: openEditUserModal,
  selectUser,
  resetPassword: toggleResetUserPasswordModal,
})(UsersView);

export { Users };
