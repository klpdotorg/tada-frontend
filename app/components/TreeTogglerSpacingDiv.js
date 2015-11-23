/*
* Just a spacing div. Not sure it needs to be its own component.
*/
import React, { Component } from 'react';

// Spacing div so tabs show up properly
export default class TreeTogglerSpacingDiv extends React.Component{
	render(){
		return (
			<div id="treetoggler" className="main__treetoggler"></div>
		);
	}
}