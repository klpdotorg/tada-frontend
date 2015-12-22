/*
This component will be the owner of state in the chain of responsibility. It encloses
all the other main content areas of TADA UI that require state storage.
*/

import React from 'react';
import NavBar from './MainNavBar';
import SecondaryNavBar from './SecondaryNavBar';
import MainContentWrapper from './MainContentWrapper';
import TadaStore from '../stores/TadaStore';

let TadaContainer = React.createClass({ 

//In order to make REST call, need to know whether 
// 1. Primary/Preschool was clicked
// 2. Category = whether district/cluster/block etc..Initially category will be district
//But as various clicks come in (inverse flow), need to determine from that.
  getInitialState: function() 
  {
      TadaStore.getCurrentSchoolSelection();
      return {currentSchoolSelection: "primary", boundaries: []};
  },
	/**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() 
  {
    console.log('Received change from stores');
    this.setState({currentSchoolSelection: TadaStore.getCurrentSchoolSelection()});
    console.log(TadaStore.getCurrentSchoolSelection());
    this.fetchBoundariesFromServer();
    
  },

  fetchBoundariesFromServer: function()
  {
  	if(this.state.currentSchoolSelection == "primary")
  	{
  		$.ajax({
	      type: "GET",
	      dataType: "json",
	      url: "http://tadadev.klp.org.in/api/v1/boundaries/?boundary_type=1&category=district",//TODO: Make a call that fetches only schools and districts
	      success: function(data) {
	            console.log(data.results);
	            this.setState( {
	              boundaries: data.results
	            });
	          }.bind(this)
	    });
  	}
  	else
  	{
  		 $.ajax({
	      type: "GET",
	      dataType: "json",
	      url: "http://tadadev.klp.org.in/api/v1/boundaries/?boundary_type=2&category=district",//TODO: Make a call that fetches only schools and districts
	      success: function(data) {
	            console.log(data.results);
	            this.setState( {
	              boundaries: data.results
	            });
	          }.bind(this)
	    });
  	}
  },

 componentDidMount: function() 
  {
    console.log('Treeview componentdidmount..')
    TadaStore.addChangeListener(this._onChange);
    this.fetchBoundariesFromServer();
  },

  componentWillUnmount: function()
  {
    TadaStore.removeChangeListener(this._onChange.bind(this));
  },

  handleBoundaryClick: function(boundary)
  {
  	console.log("On boundary click..", boundary);
  },

  render: function() {
  	console.log('Rendering TadaContainer');
    return(
    <div>
    	<NavBar/>
		<SecondaryNavBar/>
		<MainContentWrapper onBoundaryClick={this.handleBoundaryClick} boundaries={this.state.boundaries} children={this.props.children}/>
    </div>);
  }
});

export default TadaContainer;  