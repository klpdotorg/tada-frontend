import React, {Component} from 'react';
import MainContentArea from './ContentArea';
import SideBar from './SideBar';

export default class MainContentWrapper extends React.Component {
	render()
	{
		return (
			<div id="wrapper" className="main__wrapper">
				<SideBar onBoundaryClick={this.props.onBoundaryClick} boundaries={this.props.boundaries} boundaryDetails={this.props.boundaryDetails} boundaryParentChildMap={this.props.boundaryParentChildMap}/>
				<MainContentArea children={this.props.children}/>
			</div>
		);
	}
}
