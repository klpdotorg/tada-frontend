import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';

import { fetchUserData } from '../../actions/';
import { MainHeader, MainNavBar, SecondaryNavBarCont } from '../Header';
import { SideBarContainer } from '../SideBar';
import { MainContentArea, TreeTogglerSpacing } from '../../components/Dashboard';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData() {
      return dispatch(fetchUserData(sessionStorage.token));
    },
  };
};

class TadaContentContainer extends Component {
  componentWillMount() {
    this.props.fetchUserData();
  }

  render() {
    const { location, children, notifications } = this.props;

    return (
      <div>
        <MainHeader />
        <TreeTogglerSpacing />
        <MainNavBar />
        <SecondaryNavBarCont />
        <div id="wrapper" className="main__wrapper">
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
  fetchUserData: PropTypes.func,
  location: PropTypes.object,
};

const App = connect(mapStateToProps, mapDispatchToProps)(TadaContentContainer);

export { App };
