import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntitiesFromServer, logoutUser, saveNewDistrict } from '../actions/';
import NavBar from '../components/MainNavBar';
import MainHeader from '../components/MainHeader'
import SideBar from '../components/SideBar';
import SecondaryNavBar from '../components/SecondaryNavBar';
import MainContentArea from '../components/ContentArea';
import TreeTogglerSpacingDiv from '../components/TreeTogglerSpacingDiv';

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
      dispatch(fetchEntitiesFromServer(1));
    },

    handleLogout: function() {
      dispatch(logoutUser());
    },

    toggleDistrictModal: function() {
      dispatch({
        type: 'TOGGLE_CREATE_DISTRICT_MODAL'
      })
    },

    saveNewDistrict: function(name) {
      dispatch(saveNewDistrict(name))
    }

  }
}

class TadaContentContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.fetchEntityDetails();
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = nextProps;
  }

  render() {
    const {onBoundaryClick, boundaryDetails, boundariesByParentId, saveNewDistrict} = this.props
    return (
      <div>
        <MainHeader handleLogout={ this.props.handleLogout } />
        <TreeTogglerSpacingDiv/>
        <NavBar onPrimaryClick={ this.props.onPrimaryClick } onPreSchoolClick={ this.props.onPreSchoolClick } primarySelected={ this.props.primarySelected } />
        <SecondaryNavBar toggleDistrictModal={ this.props.toggleDistrictModal } districtModalIsOpen={ this.props.districtModalIsOpen } saveNewDistrict={ saveNewDistrict } />
        <div id="wrapper" className="main__wrapper">
          <SideBar onBoundaryClick={ onBoundaryClick } boundaryDetails={ boundaryDetails } boundariesByParentId={ boundariesByParentId } />
          <MainContentArea boundaryDetails={ boundaryDetails } children={ this.props.children } />
        </div>
      </div>);
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(TadaContentContainer);
