import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import { sendLoginToServer } from '../actions';
import { routeActions, push } from 'react-router-redux';

var klplogo = require('../../assets/images/KLP_logo.png');


class RegistrationForm extends Component {

 constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    const {dispatch, registered, error} = nextProps;
    console.log(nextProps);
    if(registered == true)
    {
    	console.log("Registration successful");
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value;
    const pass = this.refs.pass.value;
    const username = this.refs.username.value;

    this.refs.email.value='';
    this.refs.pass.value='';
    this.refs.username.value='';

    this.props.onRegistrationSubmit(email, pass, username);
  }

render() {

    return (
      <div id="registration-page">
        <nav className="main__header navbar navbar-white navbar-fixed-top">
          <div id="header" className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <img src={ klplogo } />
              </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
              <p className="navbar-text pull-right">
                <Link to="/login" className="btn btn-primary padded-btn">LOGIN</Link>
              </p>
            </div>
          </div>
        </nav>
        <div className="container-fluid absolute-center is-responsive">
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1"> <p className="app-name navbar-text pull-left">User Registration</p> </div>
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <form id="loginForm">
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input ref="email" className="form-control" type="text" name='email' placeholder="email id or username" defaultValue="example@somewhere.com" />
                </div>
               
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input ref="username" className="form-control" type="text" name='username' placeholder="Preferred user name" />
                </div>
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                  <input ref="pass" className="form-control" type="password" name='password' placeholder="Enter password" />
                </div>
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                  <input ref="confirmpass" className="form-control" type="password" name='confirmpassword' placeholder="Re-enter password" />
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary" onClick={ this.handleSubmit }>Register</button>
                </div>
                
                {this.props.registered && (
                	<p> Registration successful. Please Login.</p>)}
                	{this.props.error && (
                	<p> Registration Failed. Please try again.</p>)}
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

RegistrationForm.propTypes = {
  registered: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
}

export default RegistrationForm;
