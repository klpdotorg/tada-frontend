/*
* Main TADA App entry point. This composes the other elements of the page and returns it
*/
import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import '../../sass/style.scss';
import HeaderBar from './MainHeader';
import TreeTogglerSpacingDiv from './TreeTogglerSpacingDiv';

import TadaContainer from './TadaContainer';

var App = React.createClass({
 			componentDidMount: function() {
        console.log('app component did mount. much wow');
    },

    componentWillReceiveProps: function(newProps) {
        console.log('app container will receive props', arguments);
        console.log('thisProps', this.props.params);
        console.log('thisState', this.state);
        console.log('just this', this);
        console.log('app children', this.props.children);
    },
			render: function()
			{
				console.log('app container props', this.props.children)
				return (
					<div>
						<HeaderBar/>
						<TreeTogglerSpacingDiv/>
						<TadaContainer children={this.props.children}/>
						
					</div>
				);
			}
		});



module.exports=App;
