import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntitiesFromServer, fetchProgramsInstitution, logoutUser, saveNewDistrict, loginSuccess, fetchUserData, changeUserName, changePassword} from '../actions/';
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
  primarySelected: state.schoolSelection.primarySchool,
  programsByInstitutionId: state.programs.programsByInstitutionId,
  programsByStudentId: state.programs.programsByStudentId,
  
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
    onPreSchoolClick() {
      dispatch({
        type: 'PRESCHOOL_SELECTED'
      })
      dispatch(fetchEntitiesFromServer());
    },
    fetchEntityDetails() {
      dispatch(fetchEntitiesFromServer(1));
    },

    handleLogout() {
      dispatch(logoutUser());
    },

    toggleDistrictModal() {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createDistrict'
      })
    },

    saveNewDistrict(name) {
      dispatch(saveNewDistrict(name));
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

    fetchProgramsByInstitution() {
      return dispatch(fetchProgramsInstitution());
    },

    changeUserName(userName, password) {
      return dispatch(changeUserName(userName, password));
    },

    changePassword(oldPassword, newPassword) {
      return dispatch(changePassword(oldPassword, newPassword));
    }

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
    const {onBoundaryClick, boundaryDetails, boundariesByParentId, saveNewDistrict, modifyDistrict, primarySelected} = this.props
    return (
      <div>
        <MainHeader handleLogout={ this.props.handleLogout } username={this.props.username} handleChangePassword = {this.props.changePassword} handleChangeUserName = {this.props.changeUserName}/>
        <TreeTogglerSpacingDiv/>
        <NavBar onPrimaryClick={ this.props.onPrimaryClick } onPreSchoolClick={ this.props.onPreSchoolClick } primarySelected={ this.props.primarySelected } />
        <SecondaryNavBar redirectTo = {this.props.redirectTo} toggleDistrictModal={ this.props.toggleDistrictModal } districtModalIsOpen={ this.props.districtModalIsOpen } saveNewDistrict={ saveNewDistrict } />
        <div id="wrapper" className="main__wrapper">

          <SideBar primarySelected={primarySelected} onBoundaryClick={ onBoundaryClick } boundaryDetails={ boundaryDetails } boundariesByParentId={ boundariesByParentId } />
          <MainContentArea children={ this.props.children } />
        </div>

      </div>);
  }
}

TadaContentContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(TadaContentContainer);
