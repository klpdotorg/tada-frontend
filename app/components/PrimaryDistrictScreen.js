import React from 'react';
import PrimaryDistrict from './PrimaryDistrict'

export default class PrimaryDistrictContainer extends React.Component {  
  render() {
    return this.props.isFetching ? <div>Loading... </div> : 
     <PrimaryDistrict {...this.props} />
  }
}
