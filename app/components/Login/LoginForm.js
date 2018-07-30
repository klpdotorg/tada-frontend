import React from 'react';
import PropTypes from 'prop-types';

const klplogo = require('../../css/images/KLP_logo.png');
const klpImage = require('../../css/images/KLP.png');

const LoginPageWrapper = ({ error, children }) => {
  return (
    <div id="login-page">
      <nav className="main__header navbar navbar-white navbar-fixed-top">
        <div id="header" className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img alt="presentation" src={klplogo} />
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <p className="app-name navbar-text pull-left">Data Entry Operations 2017-2018</p>
            {/* <p className="navbar-text pull-right">
            <Link to="/register" className="btn btn-primary padded-btn">SIGN UP</Link>
          </p> */}
          </div>
        </div>
      </nav>
      <div className="klpimage-cont">
        <img src={klpImage} className="klpImage" />
      </div>
      <div
        className="container-fluid absolute-center is-responsive"
        style={{ position: 'relative' }}
      >
        {error && (
          <div className="alert alert-warning">
            <strong>Warning!</strong> Bad login information. Recheck the username and/or password.
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

LoginPageWrapper.propTypes = {
  error: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

export { LoginPageWrapper };
