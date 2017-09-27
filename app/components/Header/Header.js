/*
* Main header at the top of the page
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { ConfirmPassword, ChangePassword, ChangeUserInfo } from '../../containers/Header';

import klplogo from '../../../assets/images/KLP_logo.png';

const HeaderBar = ({ username, openChangePasswordModal, openChangeUserInfoModal, logoutUser }) =>
  <nav className="main__header navbar navbar-white navbar-fixed-top">
    <div id="header" className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">
          <img role="presentation" src={klplogo} />
        </a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>

        <div className="btn-group navbar-text pull-right dropdown">
          <button
            type="button"
            className="btn btn-primary padded-btn dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="glyphicon glyphicon-user" />
            <span className="caret" />
          </button>
          <ul className="dropdown-menu">
            <li onClick={openChangePasswordModal}>
              <a href="#">Change Password</a>
            </li>
            <li className="divider" />
            <li onClick={openChangeUserInfoModal}>
              <a href="#">Update Profile</a>
            </li>
          </ul>
          <Link to="/logout" onClick={logoutUser} className="btn btn-primary padded-btn">
            <span className="glyphicon glyphicon-off" />
          </Link>
        </div>
        <p className="login-msg navbar-text pull-right">
          Hello there <span className="fa fa-smile-o" />
          {username}!
        </p>
      </div>
    </div>
    <ConfirmPassword />
    <ChangePassword />
    <ChangeUserInfo />
  </nav>;

HeaderBar.propTypes = {
  username: PropTypes.string,
  openChangePasswordModal: PropTypes.func,
  openChangeUserInfoModal: PropTypes.func,
  logoutUser: PropTypes.func,
};

export { HeaderBar };
// class HeaderBar extends Component {
//   constructor(props) {
//     super(props);
//     this.handleChangeUserName = this.handleChangeUserName.bind(this);
//     this.state = {
//       enterCurrentPassword: false,
//       changePasswordOpen: false,
//       changeUserOpen: false,
//     };
//   }
//
//   componentDidMount() {
//     $('.dropdown-toggle').dropdown();
//   }
//
//   openChangeUser() {
//     this.setState({
//       changeUserOpen: true,
//     });
//   }
//
//   closeChangeUser() {
//     this.setState({
//       changeUserOpen: false,
//     });
//   }
//
//   changeUserInfo(email, firstname, lastname, mobile) {
//     this.closeChangeUser();
//     this.props
//       .dispatch(modifySelf(email, firstname, lastname))
//       .then(() => {
//         this.props.dispatch(
//           Notifications.success({
//             ...baseNotification,
//             title: 'User profile modified',
//             message: 'User profile modified successfully!',
//           }),
//         );
//       })
//       .catch(error => {
//         this.props.dispatch(
//           Notifications.error({
//             ...baseNotification,
//             title: 'Error',
//             message: 'Could not modify user profile. ERROR: ' + error,
//           }),
//         );
//       });
//   }
//
//   openChangePasswordModal() {
//     this.setState({
//       changePasswordOpen: true,
//     });
//   }
//
//   closeChangePwd() {
//     this.setState({
//       changePasswordOpen: false,
//     });
//   }
//
//   closePasswordModal() {
//     this.setState({
//       enterCurrentPassword: false,
//     });
//   }
//
//   openPasswordModal() {
//     this.setState({
//       enterCurrentPassword: true,
//     });
//   }
//
//   changePwd(newPass) {
//     this.props
//       .dispatch(changePassword(this._currentPwd, newPass))
//       .then(() => {
//         this.props.dispatch(
//           Notifications.success({
//             ...baseNotification,
//             title: 'Password changed',
//             message: 'Password changed successfully!',
//           }),
//         );
//         this._currentPwd = '';
//         this.closeChangePwd();
//       })
//       .catch(error => {
//         this.props.dispatch(
//           Notifications.error({
//             ...baseNotification,
//             title: 'Password change failed',
//             message: 'Password could not be changed!',
//           }),
//         );
//         this._currentPwd = '';
//         this.closeChangePwd();
//       });
//   }
//
//   //Add validity checking here
//   handleChangeUserName() {
//     var pwd = this.usernamePassword.value;
//     var newUserName = this.username.value;
//     this.props.handleChangeUserName(newUserName, pwd);
//   }
//
//   confirmCurrentPwd(pwd) {
//     this.props
//       .dispatch(checkUserPassword(pwd))
//       .then(response => {
//         if (response.status >= 200 && response.status < 300) {
//           this.closePasswordModal();
//           this._currentPwd = pwd;
//           this.openChangePasswordModal();
//         } else {
//           const error = new Error(response.statusText);
//           error.response = response;
//           throw error;
//         }
//       })
//       .catch(error => {
//         this.props.dispatch(
//           Notifications.error({
//             ...baseNotification,
//             title: 'Password Invalid',
//             message: 'Current password not valid! Please try again!',
//           }),
//         );
//       });
//   }
//
//   render() {
//     return (
//       <nav className="main__header navbar navbar-white navbar-fixed-top">
//         <div id="header" className="container-fluid">
//           <div className="navbar-header">
//             <a className="navbar-brand" href="/">
//               <img src={klplogo} />
//             </a>
//           </div>
//           <div id="navbar" className="navbar-collapse collapse">
//             <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
//
//             <div className="btn-group navbar-text pull-right dropdown">
//               <button
//                 type="button"
//                 className="btn btn-primary padded-btn dropdown-toggle"
//                 data-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//                 onClick={this.openUpdateProfileOptions}
//               >
//                 <span className="glyphicon glyphicon-user" /><span className="caret" />
//               </button>
//               <ul className="dropdown-menu">
//                 <li
//                 onClick={this.openPasswordModal.bind(this)}><a href="#">Change Password</a></li>
//                 <li className="divider" />
//                 <li onClick={this.openChangeUser.bind(this)}><a href="#">Update Profile</a></li>
//
//               </ul>
//
//               <Link
//                 to="/logout"
//                 onClick={this.props.handleLogout}
//                 className="btn btn-primary padded-btn"
//               >
//                 <span className="glyphicon glyphicon-off" />
//               </Link>
//
//             </div>
//
//             <p className="login-msg navbar-text pull-right">
//               Hello there <span className="fa fa-smile-o" />
//               {this.props.username}!
//             </p>
//           </div>
//         </div>
//         <ConfirmPassword
//           isOpen={this.state.enterCurrentPassword}
//           onCloseModal={this.closePasswordModal.bind(this)}
//           handleSubmit={this.confirmCurrentPwd.bind(this)}
//         />
//         <ChangePassword
//           isOpen={this.state.changePasswordOpen}
//           onCloseModal={this.closeChangePwd.bind(this)}
//           handleSubmit={this.changePwd.bind(this)}
//         />
//         <ChangeUserInfo
//           firstname={this.props.firstname}
//           lastname={this.props.lastname}
//           email={this.props.email}
//           isOpen={this.state.changeUserOpen}
//           onCloseModal={this.closeChangeUser.bind(this)}
//           handleSubmit={this.changeUserInfo.bind(this)}
//         />
//
//       </nav>
//     );
//   }
// }
//
// module.exports = HeaderBar;
