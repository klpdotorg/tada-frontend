import React from 'react';

let LoginHandler = React.createClass({ 

  render() {
  	console.log('In district',this.props.children);
    return(<div>You clicked on district {this.props.params.districtId}</div>);
  }
});

export default LoginHandler;  