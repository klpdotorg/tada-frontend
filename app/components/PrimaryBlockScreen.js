import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryBlock = React.createClass({ 

  render() {
  	var block = TadaStore.getBoundaryDetailsById(this.props.params.blockId);
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
    return(<div>You are at {district.name}> {block.name}</div>);
  }
});

export default PrimaryBlock;  