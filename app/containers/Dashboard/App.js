import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';

import { setUserProfile, fetchUserPermissions } from '../../actions/';
import { MainHeader, MainNavBar, SecondaryNavBarCont } from '../Header';
import { SideBarContainer } from '../SideBar';
import { MainContentArea, TreeTogglerSpacing } from '../../components/Dashboard';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

class TadaContentContainer extends Component {
  componentWillMount() {
    this.props.setUserProfile();
    this.props.fetchPermissions();
  }

  render() {
    const { location, children, notifications } = this.props;

    return (
      <div>
        <MainHeader />
        <TreeTogglerSpacing />
        <MainNavBar />
        <SecondaryNavBarCont />
        <div className="main__wrapper">
          <SideBarContainer location={location} />
          <MainContentArea>{children}</MainContentArea>
        </div>
        <Notifications notifications={notifications} />
      </div>
    );
  }
}

TadaContentContainer.propTypes = {
  children: PropTypes.element,
  notifications: PropTypes.array,
  setUserProfile: PropTypes.func,
  location: PropTypes.object,
  fetchPermissions: PropTypes.func,
};

const App = connect(mapStateToProps, {
  setUserProfile,
  fetchPermissions: fetchUserPermissions,
})(TadaContentContainer);

export default App;
