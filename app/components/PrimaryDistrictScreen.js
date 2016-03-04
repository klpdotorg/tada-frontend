import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryDistrict = React.createClass({ 

  render() {
  	var districtId = this.props.params.districtId;
  	var boundary = TadaStore.getBoundaryDetailsById(districtId);
  	var districtPath = "#" + boundary.path;
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li className="active">{boundary.name}</li>
    		</ol>
    		<h4 className="heading-err heading-border"> Insufficient Permissions</h4>
    		<p>You need administrator privileges to modify Boundary details.</p>
    		<h4 className="brand-blue heading-border"> View Details</h4>
    		<p> Name: {boundary.name} </p>
    	</div>
    );
  }
});

export default PrimaryDistrict;  