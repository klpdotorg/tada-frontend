import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchBoundaryDetails} from '../actions/TadaActionCreators2';

class TadaContentContainer extends Component {

	constructor(props)
	{
		console.log("TadaContentContainer constructor called")
		super(props);
		console.log(this.props.dispatch);
	}

	componentWillMount()
	{
		console.log("TadaContentContainer componentWillMount")
		const {dispatch} = this.props;
	}

	componentDidMount()
	{
		console.log("TadaContentContainer did mount");
		const {dispatch} = this.props;
		dispatch(fetchBoundaryDetails(1));

	}

	componentWillReceiveProps(nextProps)
	{
		const {dispatch} = nextProps;
		console.log("TadaContentContainer Component will receive props", dispatch);
	}

	render() {
		console.log('Rendering TadaContentContainer');
		return <div>SAMPLE DIV</div>
	}
}

var mapStateToProps = function(state){
  return {boundaryDetails: state.entities.boundaryDetails, boundaryParentChildMap: state.entities.boundariesByParentId }
}

/*var mapDispatchToProps = function(dispatch){
  return {
    onBoundaryClick: function(boundary){
      console.log("onBoundaryClick")
    },
    onPrimaryClick: function(){
      console.log("onPrimaryClick")
    },
    showPreschoolHierarchy: function() {
      console.log("showPreschoolHierarchy");
    }
  }
}*/
module.exports = connect(mapStateToProps)(TadaContentContainer);