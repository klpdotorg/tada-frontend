import React, {Component} from 'react';
import MainContentArea from './ContentArea';
import SideBar from './SideBar';

export default class MainContentWrapper extends React.Component {
	render()
	{
		return (
			<div id="wrapper" class="main__wrapper">
				<SideBar/>
				<MainContentArea/>
			</div>
		);
	}
}