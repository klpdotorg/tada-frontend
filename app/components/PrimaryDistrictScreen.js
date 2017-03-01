import React from 'react';
import PrimaryDistrict from './PrimaryDistrict';
import { connect } from 'react-redux';

class BoundaryEntitiesContainer extends React.Component {  
  render() {
    return this.props.isFetching ? <div>Loading... </div> : 
     <PrimaryDistrict {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boundaryDetailsById: state.entities.boundaryDetails,
    boundariesByParentId: state.entities.boundariesByParentId  
  }
}

const BoundaryContainer = connect(mapStateToProps)(BoundaryEntitiesContainer);


export default BoundaryContainer;
