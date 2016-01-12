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
    		<div className="form-heading heading-border"> Insufficient Permissions</div>
    		<p>You need administrator privileges to modify Boundary details.</p>
    		<div className="form-heading heading-border"> View Details</div>
    		<p> Name: {boundary.name} </p>
    	</div>
    );
  }
});

export default PrimaryDistrict;  