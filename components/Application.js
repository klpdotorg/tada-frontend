/*
* Main TADA App entry point. This composes the other elements of the page and returns it
*/
import React, {Component} from 'react';
import '../sass/style.scss';
import HeaderBar from './MainHeader';
import TreeTogglerSpacingDiv from './TreeTogglerSpacingDiv';
import NavBar from './MainNavBar';
import SecondaryNavBar from './SecondaryNavBar';
import MainContentWrapper from './MainContentWrapper';


var App = React.createClass({
 
			render: function()
			{
				return (
					<div>
						<HeaderBar/>
						<TreeTogglerSpacingDiv/>
						<NavBar/>
						<SecondaryNavBar/>
						<MainContentWrapper/>
					</div>
				);
			}
		});
module.exports=App;
