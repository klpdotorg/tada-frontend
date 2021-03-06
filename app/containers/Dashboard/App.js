import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';

import { setUserProfile, fetchUserPermissions, fetchStates } from '../../actions/';
import { MainHeader, MainNavBar, SecondaryNavBarCont } from '../Header';
import { LoadingBoundary } from '../common';
import { Loading } from '../../components/common';
import { SideBarContainer } from '../SideBar';
import { MainContentArea, TreeTogglerSpacing } from '../../components/Dashboard';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    stateLoading: state.states.loading,
  };
};

class TadaContentContainer extends Component {
  constructor() {
    super();
    this.state = {
      showSideBar: true,
    };

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  state = {
    showSideBar: true,
  };

  componentWillMount() {
    this.props.fetchStates();
    this.props.setUserProfile();
    this.props.fetchPermissions();
  }

  toggleSideBar(e) {
    e.preventDefault();
    this.setState({
      showSideBar: !this.state.showSideBar,
    });
  }

  render() {
    const { location, children, notifications, params, stateLoading } = this.props;
    const { showSideBar } = this.state;
    if (stateLoading) {
      return <Loading />;
    }

    return (
      <div>
        <MainHeader />
        <TreeTogglerSpacing />
        <MainNavBar />
        <SecondaryNavBarCont />
        <div className="main__wrapper">
          <SideBarContainer location={location} showSideBar={showSideBar} params={params} />
          <MainContentArea>{children}</MainContentArea>
          <div className="sidebar-toggler" style={{ left: showSideBar ? '22.3%' : '0px' }}>
            <a
              href="#menu-toggle"
              className="btn btn-primary btn-xs"
              id="menu-toggle"
              onClick={this.toggleSideBar}
            >
              <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal" />
            </a>
          </div>
          <LoadingBoundary show />
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
  fetchStates: PropTypes.func,
  params: PropTypes.object,
  stateLoading: PropTypes.bool,
};

const App = connect(mapStateToProps, {
  setUserProfile,
  fetchPermissions: fetchUserPermissions,
  fetchStates,
})(TadaContentContainer);

export default App;
