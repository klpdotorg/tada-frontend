import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions/';

import { MainHeader, MainNavBar, SecondaryNavBarCont } from '../Header';
import { SideBarContainer } from '../SideBar';
import MainContentArea from '../../components/ContentArea';
import TreeTogglerSpacingDiv from '../../components/TreeTogglerSpacingDiv';
import Notifications from 'react-notification-system-redux';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  fetchUserData() {
    return dispatch(fetchUserData(sessionStorage.token));
  },
});

class TadaContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount() {
    this.props.fetchUserData();
  }

  render() {
    const { location, children, notifications } = this.props;

    return (
      <div>
        <MainHeader />
        <TreeTogglerSpacingDiv />
        <MainNavBar />
        <SecondaryNavBarCont />
        <div id="wrapper" className="main__wrapper">
          <SideBarContainer location={location} />
          <MainContentArea children={children} />
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
  getInitData: PropTypes.func,
  location: PropTypes.object,
};

const App = connect(mapStateToProps, mapDispatchToProps)(TadaContentContainer);

export { App };
