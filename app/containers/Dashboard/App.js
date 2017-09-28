import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserData, getBoundaries } from '../../actions/';

import { MainHeader, MainNavBar, SecondaryNavBarCont } from '../Header';
import { SideBarContainer } from '../SideBar';
import MainContentArea from '../../components/ContentArea';
import TreeTogglerSpacingDiv from '../../components/TreeTogglerSpacingDiv';
import Notifications from 'react-notification-system-redux';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  getInitData() {
    return dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(2),
    });
  },
  fetchUserData() {
    return dispatch(fetchUserData(sessionStorage.token));
  },
});

class TadaContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.fetchUserData();
    this.props.getInitData().then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { location, children, notifications } = this.props;

    return this.state.isLoading
      ? <div>Loading... </div>
      : <div>
          <MainHeader />
          <TreeTogglerSpacingDiv />
          <MainNavBar />
          <SecondaryNavBarCont />
          <div id="wrapper" className="main__wrapper">
            <SideBarContainer location={location} />
            <MainContentArea children={children} />
          </div>
          <Notifications notifications={notifications} />
        </div>;
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
