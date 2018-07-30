import React from 'react';
import { Link } from 'react-router';

const klplogo = require('../css/images/KLP_logo.png');
const klpImage = require('../css/images/KLP.png');

const Logout = () => {
  return (
    <div id="logout_page">
      <nav className="main__header navbar navbar-white navbar-fixed-top">
        <div id="header" className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img src={klplogo} />
            </a>
          </div>

          <div id="navbar" className="navbar-collapse collapse">
            <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
            <p className="navbar-text pull-right">
              <Link to="/login" className="btn btn-primary padded-btn">
                LOGIN
              </Link>
            </p>
          </div>
        </div>
      </nav>
      <div className="klpimage-cont">
        <img src={klpImage} className="klpImage" />
      </div>
      <div className="row logout-text">
        <div className="col-lg-12">
          <span>You have successfully logged out. Come back soon!</span>
        </div>
      </div>
    </div>
  );
};

export default Logout;
