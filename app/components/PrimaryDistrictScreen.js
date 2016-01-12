import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryDistrict = React.createClass({ 

  render() {
  	var districtId = this.props.params.districtId;
  	var boundary = TadaStore.getBoundaryDetailsById(districtId);
    return(<div>You are at {boundary.name}</div>);
  }
});

export default PrimaryDistrict;  