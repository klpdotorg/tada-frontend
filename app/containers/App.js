import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntitiesFromServer, logoutUser, saveNewDistrict,
  loginSuccess, fetchUserData, modifyDistrict } from '../actions/';
import { push } from 'react-router-redux';
import NavBar from '../components/MainNavBar';
import MainHeader from '../components/MainHeader';
import SideBar from '../components/SideBar';
import SecondaryNavBar from '../components/SecondaryNavBar';
import MainContentArea from '../components/ContentArea';
import TreeTogglerSpacingDiv from '../components/TreeTogglerSpacingDiv';

const mapStateToProps = state => ({
  boundaryDetails: state.entities.boundaryDetails,
  boundariesByParentId: state.entities.boundariesByParentId,
  routerState: state.routing,
  username: state.login.username,
  districtModalIsOpen: state.modal.createDistrictModalIsOpen,
  primarySelected: state.schoolSelection.primarySchool
});

var mapDispatchToProps = function(dispatch) {
  return {
    onBoundaryClick(boundary) {
      dispatch(fetchEntitiesFromServer(boundary.id));
    },
    onPrimaryClick() {
      dispatch({
        type: 'PRIMARY_SELECTED',
      });
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
      dispatch(saveNewDistrict(name));
    },

    modifyDistrict: function(districtid,name)
    {
        dispatch(modifyDistrict(districtid,name));
    },

    redirectTo(url) {
      dispatch(push(url));
    },

    loggedIn(token) {
      dispatch(loginSuccess(token));
    },

    fetchUserData() {
      return dispatch(fetchUserData(sessionStorage.token));
    },

  };
};


class TadaContentContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!sessionStorage.token) {
      this.props.redirectTo('/login');
    } else {
      this.props.loggedIn(sessionStorage.token);
      this.props.fetchUserData()
      .then(this.props.fetchEntityDetails());
    }
  }

  render() {
    const {onBoundaryClick, boundaryDetails, boundariesByParentId, saveNewDistrict, modifyDistrict} = this.props
    return (
      <div>
        <MainHeader handleLogout={ this.props.handleLogout } />
        <TreeTogglerSpacingDiv/>
        <NavBar onPrimaryClick={ this.props.onPrimaryClick } onPreSchoolClick={ this.props.onPreSchoolClick } primarySelected={ this.props.primarySelected } />
        <SecondaryNavBar toggleDistrictModal={ this.props.toggleDistrictModal } districtModalIsOpen={ this.props.districtModalIsOpen } saveNewDistrict={ saveNewDistrict } />
        <div id="wrapper" className="main__wrapper">
        <SideBar onBoundaryClick={ onBoundaryClick } boundaryDetails={ boundaryDetails } boundariesByParentId={ boundariesByParentId } />
        <MainContentArea onModifyDistrict = { this.props.modifyDistrict } boundaryDetails={ boundaryDetails } children={ this.props.children } />
      </div>
      </div>);
  }
}

TadaContentContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(TadaContentContainer);
