import React, {Component} from 'react';
import '../sass/style.scss';
import HeaderBar from './MainHeader';
import TreeTogglerSpacingDiv from './TreeTogglerSpacingDiv';
import NavBar from './MainNavBar';
import SecondaryNavBar from './SecondaryNavBar';
import MainContentArea from './ContentArea';


var App = React.createClass({
 getInitialState: function() {
    return {results: []};
  },
			componentDidMount: function() 
			{
				$.ajax({
			type: "GET",
			dataType: "json",
			url: "http://tadadev.klp.org.in/api/v1/boundaries/",//TODO: Make a call that fetches only schools and districts
			success: function(data){
				console.log(data.results);
				this.setState({
					results: data.results
					});
			}.bind(this)
			});
			}
			,
			render: function()
			{
				return (
					<div>
						<HeaderBar/>
						<TreeTogglerSpacingDiv/>
						<NavBar/>
						<SecondaryNavBar/>
						<ul className="nav-sidebar">
						{
							this.state.results.map(function(result){
								return (
									<li className="glyphicon-plus"><a href="">{result.name}</a></li>
								);
							})
						}
						</ul>
						<MainContentArea/>
					</div>
				);
			}
		});
module.exports=App;
