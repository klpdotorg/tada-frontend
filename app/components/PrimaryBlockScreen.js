import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryBlock = React.createClass({ 

  render() {
  	var block = TadaStore.getBoundaryDetailsById(this.props.params.blockId);
  	var blockPath = "#" + block.path;
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
  	var districtPath = "#" + district.path;
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li><a href={districtPath}>{district.name}</a></li>
    			<li className="active">{block.name}</li>
    		</ol>
    		<h4 cassName="heading-border heading-err"> Insufficient Permissions</h4>
    		<p>Yolu need administrator privileges to modify Boundary details.</p>
    		<h4 className="heading-border brand-blue"> View Details</h4>
    		<p> Name: {block.name} </p>
    	</div>
    	);
  }
});

export default PrimaryBlock;  