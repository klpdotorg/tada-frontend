import React from 'react';

var SideBar = React.createClass ({
	getInitialState: function() {
    	return {results: []};
  	},
	componentDidMount: function()
	{
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "http://tadadev.klp.org.in/api/v1/boundaries/",//TODO: Make a call that fetches only schools and districts
			success: function(data) {
						console.log(data.results);
						this.setState( {
							results: data.results
						});
					}.bind(this) //end of success callback
		});//end of ajax block
	},
	
	render: function() {
		return (
			<div id="sidebar" className="main__sidebar">
				<ul className="nav-sidebar">
					{
						this.state.results.map(function(result){
							return (
								<li className="glyphicon-none glyphicon-plus"><a href="">{result.name}</a></li>
							);
						})
					}
				</ul>
			</div>
		);
	}
});

module.exports=SideBar;