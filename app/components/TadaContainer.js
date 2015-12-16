/*
This component will be the owner of state in the chain of responsibility. It encloses
all the other main content areas of TADA UI that require state storage.
*/

import React from 'react';
import NavBar from './MainNavBar';
import SecondaryNavBar from './SecondaryNavBar';
import MainContentWrapper from './MainContentWrapper';

let TadaContainer = React.createClass({ 

  render() {
  	console.log('Rendering TadaContainer');
    return(
    <div>
    	<NavBar/>
		<SecondaryNavBar/>
		<MainContentWrapper children={this.props.children}/>
    </div>);
  }
});

export default TadaContainer;  