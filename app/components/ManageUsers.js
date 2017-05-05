import React from 'react';
import * as actions from '../actions/';
import CreateUser from './Modals/CreateUser';
import EditUser from './Modals/EditUser';
import ResetPassword from './Modals/ResetPassword';
import GenericDialog from './Modals/GenericDialog';
import ConfirmDialog from './Modals/ConfirmDialog';
import { roles as ROLES } from '../constants';
export default class ManageUsers extends React.Component {

constructor(props){
	super(props);
	this.state = {
		selectedUserIds: [],
		isCreateUserModalOpen: false,
		isEditUserModalOpen: false,
		selectedUser: -1,
		showDialog: false,
		dialogTitle: "",
		dialogMessage: "",
		selectedPage: 1,
		isConfirmDlgOpen: false,
		isResetPasswordModalOpen: false
	}
	this.getPageNumbers = this.getPageNumbers.bind(this);
	this.handlePageClick = this.handlePageClick.bind(this);
	this.mapRoleToDisplayLabel = this.mapRoleToDisplayLabel.bind(this);
}

componentDidMount(){
	this.props.dispatch(actions.fetchUsers(1));
}

componentWillReceiveProps(nextProps){
	//console.log("Received update in ManageUsers");
}
openEditUserModal(e) {

	var trId = $(e.currentTarget).closest('tr').prop('id');
	var selectedUser = this.props.usersById[trId];
	this.setState({
		isEditUserModalOpen: true,
		selectedUser: selectedUser
	});
}

closeEditUserModal() {
	this.setState({
		isEditUserModalOpen: false
	})
}

openResetPasswordModal(e) {

	var trId = $(e.currentTarget).closest('tr').prop('id');
	var selectedUser = this.props.usersById[trId];
	this.setState({
		isResetPasswordModalOpen: true,
		selectedUser: selectedUser
	});
}

closeResetPasswordModal() {
	this.setState({
		isResetPasswordModalOpen: false,
	})
}
closeCreateUserModal() {
	this.setState({
		isCreateUserModalOpen: false
	});
}

openConfirmDlg() {
	this.setState({
		isConfirmDlgOpen: true,
		dialogTitle: "Delete?",
		dialogMessage: "Are you sure you want to delete the(se) user(s)?"
	});
}

closeConfirmModal() {
	this.setState({
		isConfirmDlgOpen: false
	});
}
openCreateUserModal() {
	this.setState({
		isCreateUserModalOpen: true
	})
}

closeGenericDialog() {
	this.setState({
		showDialog: false,
		dialogTitle: "",
		dialogMessage: ""
	})
}


deactivateUsers()
{
	for(let i=0; i<this.state.selectedUserIds.length; i++)
	{
		this.props.dispatch(actions.deactivateUser(this.state.selectedUserIds[i]));
	}
	this.setState({
		selectedUserIds: []
	});
}


deleteUsers()
{
	this.closeConfirmModal();
	for(let i=0; i<this.state.selectedUserIds.length; i++)
	{
		this.props.dispatch(actions.deleteUser(this.state.selectedUserIds[i]));
	}
	this.setState({
		selectedUserIds: []
	});
}

createUser(firstname, lastname, username, email,password, role){
	this.closeCreateUserModal();
	this.props.dispatch(actions.createUser(firstname,lastname,username, email, password, role)).then( () => {
		//show generic dialog that confirms user creation success.

		var message = "User <b>" + username + "</b> created successfully";
		this.setState({
			showDialog: true,
			dialogTitle: "User Created!",
			dialogMessage: message
		});
		});
}

editUser(id,firstname, lastname, email, role)
{
	this.closeEditUserModal();
	this.props.dispatch(actions.modifyUser(id,firstname, lastname, email, role));
}

selectUser(e)
{
	var userId = $(e.currentTarget).closest('tr').prop('id');
	var newSelectedUsers = this.state.selectedUserIds.slice();
	if(e.currentTarget.checked && jQuery.inArray(userId,this.state.selectedUserIds) == -1)
	{
		newSelectedUsers.push(userId);
	}
	else
	{
		newSelectedUsers.splice( $.inArray(userId, newSelectedUsers), 1 );
	}
	this.setState({
		selectedUserIds: newSelectedUsers
	});
}

getPageNumbers(usercount)
{
	var numPages = Math.ceil(usercount / 20);
	var pageArray = [];
	var i = 1;
	for(i = 1; i <= numPages; i++)
		{
			pageArray.push(i);
		}
	return pageArray;
}


handlePageClick(pageNum)
{
	this.props.dispatch(actions.setCurrentPage(pageNum));
	this.props.dispatch(actions.fetchUsers(pageNum));
	this.setState({
		selectedPage: pageNum
	});

}

mapRoleToDisplayLabel(role)
{
	var displayLabel;
	if(role == ROLES.ADMIN)
		displayLabel = "Administrator";
	else if(role == ROLES.DEE)
		displayLabel = "DEE";
	else if(role == ROLES.DEO)
		displayLabel = "DEO";
	else
		displayLabel = "N/A";
	return displayLabel;
}


resetPassword(id,password)
{
	this.closeResetPasswordModal();
	let user = this.props.usersById[id];
	this.props.dispatch(actions.resetPasswordForce(id, password)).then(()=>
	{
		this.setState({
			showDialog: true,
			dialogTitle: "Password reset successful",
			dialogMessage: "Password has been reset successfully for user " + user.username,
		});
	}).catch(error=>{
			this.setState({
			showDialog: true,
			dialogTitle: "Password reset failed",
			dialogMessage: "Password could not be reset for user " + user.username + ". Please try again later!",
		});
	});
}


render()
 {
	var users = this.props.usersById;
	var usersByPage = this.props.usersByPage[this.state.selectedPage];
	var userCount = this.props.userCount;
	var pages =  this.getPageNumbers(userCount);

	var paginationList = pages.map((page) => {
		return (
			<li><a href="#" key={page} onClick={this.handlePageClick.bind(null,page)}>{page}</a></li>
		);
	});
	var usersList;
	if(usersByPage)
	{
	usersList =	Object.values(usersByPage.ids).map((id,i)=>{
			var user = this.props.usersById[id];
			var fullName = user.first_name + user.last_name;
			var userRole = "N/A";
			if(user.groups && user.groups.length > 0) {
        		user.groups.map((item, index) => {
	          		userRole = this.mapRoleToDisplayLabel(item.name);
        	});
			}
			return(
				<tr id={user.id} key={user.id}>
					<td>{fullName}</td>
					<td>{user.username}</td>
					<td>{userRole}</td>
					<td><input type="checkbox" className="btn" onClick={this.selectUser.bind(this)}/></td>
					<td><button className="btn btn-primary brand-blue-bg fa fa-pencil-square-o" onClick={this.openEditUserModal.bind(this)}></button></td>
					<td><button className="btn btn-primary brand-blue-bg fa fa-unlock-alt" onClick={this.openResetPasswordModal.bind(this)}></button></td>
				</tr>
				);
	});
}
else {
	usersList = <tr colSpan="6"><td colSpan="6" style={{"text-align": "center"}}>
<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>Loading...</td></tr>
}

	return(		<div>
					<div className="row">
						<div className="col-md-12">
							<button className="btn btn-primary brand-orange-bg pull-right" onClick={this.openCreateUserModal.bind(this)}>Add User</button>
						</div>

					</div>
					<div className="row center-block">
						<h4>Manage Users </h4>
					</div>
					<table className="table table-bordered table-striped">
					<tbody>
						<tr className="info">
							<th>Full Name</th>
							<th>User ID</th>
							<th>Role</th>
							<th>Select</th>
							<th>Edit</th>
							<th>Reset Password</th>

						</tr>
						{usersList}
					</tbody>
					</table>
					<div className="col-md-8 pull-right">
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.openConfirmDlg.bind(this)}>Delete</button>
						<button type="button" className="col-sm-3 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.deactivateUsers.bind(this)}>Deactivate</button>
					</div>
					<div className="center-block row">
						<nav aria-label="Page navigation">
							  <ul className="pagination pagination-lg">
							    <li>
							      <a href="#" aria-label="Previous">
							        <span aria-hidden="true">&laquo;</span>
							      </a>
							    </li>
							   {paginationList}
							    <li>
							      <a href="#" aria-label="Next">
							        <span aria-hidden="true">&raquo;</span>
							      </a>
							    </li>
							  </ul>
						</nav>
					</div>
					<CreateUser isOpen={this.state.isCreateUserModalOpen} onCloseModal={this.closeCreateUserModal.bind(this)} handleSubmit={this.createUser.bind(this)}></CreateUser>
					<EditUser user={this.state.selectedUser} isOpen={this.state.isEditUserModalOpen} onCloseModal={this.closeEditUserModal.bind(this)} handleSubmit={this.editUser.bind(this)}/>
					<GenericDialog isOpen={this.state.showDialog} onCloseModal={this.closeGenericDialog.bind(this)} title={this.state.dialogTitle} message={this.state.dialogMessage}/>
					<ConfirmDialog isOpen={this.state.isConfirmDlgOpen} onCloseModal={this.closeConfirmModal.bind(this)} title={this.state.dialogTitle} message={this.state.dialogMessage} onYes={this.deleteUsers.bind(this)}/>
					<ResetPassword user={this.state.selectedUser} isOpen={this.state.isResetPasswordModalOpen} onCloseModal={this.closeResetPasswordModal.bind(this)} handleSubmit={this.resetPassword.bind(this)}/>
				</div> );
}
}
