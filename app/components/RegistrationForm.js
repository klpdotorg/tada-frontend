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
    this.goToLoginPage = this.goToLoginPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    const {dispatch, registered, error} = nextProps;
    (nextProps);
    if(registered == true)
    {
    	$('#regSuccessfulModal').modal('show');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const pass = this.refs.pass.value;
    const username = this.refs.username.value;

    this.refs.email.value='';
    this.refs.pass.value='';
    this.refs.username.value='';
    this.refs.confirmpass.value='';

    this.props.onRegistrationSubmit(email, pass, username);
  }

  goToLoginPage()
  {
    this.props.redirectTo('/login');
    $('#regSuccessfulModal').modal('hide');
  }

render() {

    return (
      <div id="registration-page">
        <nav className="main__header navbar navbar-white navbar-fixed-top">
          <div id="header" className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
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


                	{this.props.error && (
                	<p> Registration Failed. Please try again.</p>)}
              </form>
            </div>
          </div>
        </div>
      {/* Reg successful modal*/}
         <div className="modal fade" data-backdrop="false" id="regSuccessfulModal" tabIndex="-1" role="dialog" aria-labelledby="regSuccessfulModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="regSuccessTitle"> Registration Successful</h4>
                          </div>
                          <div className="modal-body">
                              Registration successful! Please click OK to proceed to the Login page.
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.goToLoginPage}>OK</button>
                          </div>
                      </div>
                  </div>
        }
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
