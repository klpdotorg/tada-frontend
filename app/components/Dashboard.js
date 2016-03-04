import React from 'react';
import {Link} from 'react-router';
let Dashboard = React.createClass({ 

  render() {
    return(
    	<div>
    		<Link to="logout">Logout</Link>
    		<div className="col-sm-offset-2 col-sm-10">
    			<h3> Welcome back! </h3>
                <button type="submit" className="btn btn-primary">Take me back!</button>
                <p> Here is yesterday's summary: </p>
                <ul>
                	<li> Number of schools created or modified: </li>
                	<li> Number of Preschools created or modified: </li>
                	<li> Number of students created or modified: </li>
                	<li> Number of assessment entries made: </li>
                </ul>
                <p> Thank you for all the effort! </p>
            </div>
    	</div>
    );
  }
});

export default Dashboard;  