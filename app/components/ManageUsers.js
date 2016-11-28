import React from 'react';
import * as actions from '../actions/';

export default class ManageUsers extends React.Component {

constructor(props){
	super(props);
}

render(){

	return(		<div>
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
						
					</tbody>
					</table>
				</div> );
}
}