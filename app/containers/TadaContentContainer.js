import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchBoundaryDetails} from '../actions/TadaActionCreators2';
import NavBar from '../components/MainNavBar';
import SideBar from '../components/SideBar';
import SecondaryNavBar from '../components/SecondaryNavBar';
import MainContentArea from '../components/ContentArea';

class TadaContentContainer extends Component {

	constructor(props)
	{
		console.log("TadaContentContainer constructor called")
		super(props);
		console.log(this.props.dispatch);
	}

	componentWillMount()
	{
		console.log("TadaContentContainer componentWillMount", this.props);
		const {dispatch} = this.props;

	}

	componentDidMount()
	{
		console.log("TadaContentContainer did mount");
		this.props.fetchBoundaryDetails();

	}

	componentWillReceiveProps(nextProps)
	{
		const {dispatch} = nextProps;
		console.log("TadaContentContainer Component will receive props", nextProps);
	}

	render() {
		console.log('Rendering TadaContentContainer');
		const {onBoundaryClick, boundaryDetails, boundariesByParentId } = this.props
    return(
    	<div>
    		<NavBar/>
		  	<SecondaryNavBar/>
		  	<div id="wrapper" className="main__wrapper">
				<SideBar onBoundaryClick={onBoundaryClick} boundaryDetails={boundaryDetails} boundariesByParentId={boundariesByParentId}/>
				<MainContentArea boundaryDetails={boundaryDetails} children={this.props.children}/>
			</div>
    	</div>);
	}
}

var mapStateToProps = function(state){
  return {
  	boundaryDetails: state.entities.boundaryDetails, 
  	boundariesByParentId: state.entities.boundariesByParentId,
  	routerState: state.routing}
}

var mapDispatchToProps = function(dispatch){
  return {
    onBoundaryClick: function(boundary){
      console.log("onBoundaryClick")
    },
    onPrimaryClick: function(){
      console.log("onPrimaryClick")
    },
    showPreschoolHierarchy: function() {
      console.log("showPreschoolHierarchy");
    },
    fetchBoundaryDetails: function() {
    	console.log("fetch boundaryDetails called");
    	dispatch(fetchBoundaryDetails(1));
    }
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(TadaContentContainer);