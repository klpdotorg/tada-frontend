import React from 'react';
import TreeView from './treeView';
import $ from 'jquery';


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
			<div id="wrapper" className="">
         <div id="sidebar-wrapper">
            <div id="treetoggler">
              <a href="#menu-toggle" className="btn btn-primary btn-xs" id="menu-toggle">
                <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal"></span>
              </a>
            </div>
          <div id="treeview_side" className="treeview"><TreeView/></div>
        </div>
      </div>

		);
	}
});

module.exports=SideBar;
