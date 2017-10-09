import React from 'react';
import PropTypes from 'prop-types';

const klplogo = require('../../../assets/images/KLP_logo.png');

const LoginPageWrapper = ({ error, children }) =>
  <div id="login-page">
    <nav className="main__header navbar navbar-white navbar-fixed-top">
      <div id="header" className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <img role="presentation" src={klplogo} />
          </a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
          {/* <p className="navbar-text pull-right">
            <Link to="/register" className="btn btn-primary padded-btn">SIGN UP</Link>
          </p>*/}
        </div>
      </div>
    </nav>
    <div className="container-fluid absolute-center is-responsive">
      {error &&
        <p className="bg-danger text-danger">
          Bad login information. Recheck the username and/or password.
        </p>}
      {children}
    </div>
  </div>;

LoginPageWrapper.propTypes = {
  error: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

export { LoginPageWrapper };