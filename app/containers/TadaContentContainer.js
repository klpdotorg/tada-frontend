import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntitiesFromServer, logoutUser, saveNewDistrict } from '../actions/';
import NavBar from '../components/MainNavBar';
import SideBar from '../components/SideBar';
import SecondaryNavBar from '../components/SecondaryNavBar';
import MainContentArea from '../components/ContentArea';

class TadaContentContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log("TadaContentContainer componentWillMount", this.props);
    const {dispatch} = this.props;
  }

  componentDidMount() {
    console.log("TadaContentContainer did mount");
    this.props.fetchEntityDetails();
  }

  componentWillReceiveProps(nextProps) {
    console.log('props', nextProps)
    const {dispatch} = nextProps;
    console.log("TadaContentContainer Component will receive props", nextProps);
  }

  render() {
    console.log('Rendering TadaContentContainer');
    const {onBoundaryClick, boundaryDetails, boundariesByParentId, saveNewDistrict} = this.props
    return (
      <div>
        <NavBar onPrimaryClick={ this.props.onPrimaryClick } onPreSchoolClick={ this.props.onPreSchoolClick } primarySelected={ this.props.primarySelected } />
        <SecondaryNavBar toggleDistrictModal={ this.props.toggleDistrictModal } districtModalIsOpen={ this.props.districtModalIsOpen } saveNewDistrict={ saveNewDistrict } />
        <div id="wrapper" className="main__wrapper">
          <SideBar onBoundaryClick={ onBoundaryClick } boundaryDetails={ boundaryDetails } boundariesByParentId={ boundariesByParentId } />
          <MainContentArea boundaryDetails={ boundaryDetails } children={ this.props.children } />
        </div>
      </div>);
  }
}

var mapStateToProps = function(state) {
  return {
    boundaryDetails: state.entities.boundaryDetails,
    boundariesByParentId: state.entities.boundariesByParentId,
    routerState: state.routing,
    username: state.login.username,
    districtModalIsOpen: state.modal.createDistrictModalIsOpen,
    primarySelected: state.schoolSelection.primarySchool
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    onBoundaryClick: function(boundary) {
      console.log("onBoundaryClick")
      dispatch(fetchEntitiesFromServer(boundary.id));
    },
    onPrimaryClick: function() {
      dispatch({
        type: 'PRIMARY_SELECTED'
      })
    },
    onPreSchoolClick: function() {
      dispatch({
        type: 'PRESCHOOL_SELECTED'
      })
    },
    fetchEntityDetails: function() {
      console.log("fetch boundaryDetails called");
      dispatch(fetchEntitiesFromServer(1));
    },

    handleLogout: function() {
      dispatch(logoutUser('deleteme'));
    },

    toggleDistrictModal: function() {
      dispatch({
        type: 'TOGGLE_CREATE_DISTRICT_MODAL'
      })
    },

    saveNewDistrict: function(name) {
      console.log(name)
      dispatch(saveNewDistrict(name))
    }

  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(TadaContentContainer);
