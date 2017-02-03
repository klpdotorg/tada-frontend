import React from 'react';
import * as actions from '../actions/';
import CreateUser from './Modals/CreateUser';

export default class ManageUsers extends React.Component {

constructor(props){
	super(props);
	this.state = {
		selectedUserIds: [],
		isCreateUserModalOpen: false
	}
}

componentDidMount(){
	this.props.dispatch(actions.listUsers());
}

closeCreateUserModal() {
	this.setState({
		isCreateUserModalOpen: false
	});
}

openCreateUserModal() {
	this.setState({
		isCreateUserModalOpen: true
	})
}

createUser(firstname, lastname, username, email,password, role){
	closeCreateUserModal();
	this.props.dispatch(actions.createUser(firstname,lastname,username, email, password, role));
}

selectUser(e)
{
	var userId = $(e.currentTarget).closest('tr').prop('id');
	var newSelectedUsers = this.state.selectedUserIds.slice();
	if(e.currentTarget.checked && jQuery.inArray(assId,this.state.selectedUserIds) == -1)
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

render(){
	var users = this.props.usersById;

	var usersList =	Object.values(users).map((user,i)=>{

			var fullName = user.first_name + user.last_name;
			return(
				<tr id={user.id} key={user.id}>
					<td>{fullName}</td>
					<td>{user.username}</td>
					<td>TBD</td>
					<td>Active</td>
					<td><input type="checkbox" className="btn"/></td>
					<td><button className="btn btn-primary brand-blue-bg fa fa-pencil-square-o"></button></td>
					<td><button className="btn btn-primary brand-blue-bg fa fa-unlock-alt"></button></td>
				</tr>
				);
	});
	
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
							<th>Status</th>
							<th>Select</th>
							<th>Edit</th>
							<th>Reset Password</th>
							
						</tr>
						{usersList}
					</tbody>
					</table>
					<div className="col-md-8 pull-right">
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn">Delete</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn">Activate</button>
						<button type="button" className="col-sm-3 btn btn-info navbar-btn brand-blue-bg all-padded-btn">Deactivate</button>
					</div>
					<CreateUser isOpen={this.state.isCreateUserModalOpen} onCloseModal={this.closeCreateUserModal.bind(this)} handleSubmit={this.createUser.bind(this)}></CreateUser>
				</div> );
}
}