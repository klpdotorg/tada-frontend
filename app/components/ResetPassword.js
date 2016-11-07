import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import { resetPassword } from '../actions';
import { routeActions, push } from 'react-router-redux';

var klplogo = require('../../assets/images/KLP_logo.png');


class ResetPasswordUI extends Component {

  constructor(props) {
    super(props);
    console.log("Props in reset password", props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {

    const {dispatch, authenticated, token, error} = nextProps;
    console.log("Reset password receiving props", dispatch);
    if(nextProps.resetRequestSuccess)
    {
      this.email.value="";
    }
  }

  handleSubmit(event) {
    event.preventDefault()

     const email = this.email.value;
     this.props.dispatch(resetPassword(email));
    
  }

  render() {

    return (
      <div id="login-page">
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
                <Link to="/register" className="btn btn-primary padded-btn">SIGN UP</Link>
              </p>
              <p className="navbar-text pull-right">
                <Link to="/login" className="btn btn-primary padded-btn">LOGIN</Link>
              </p>
            </div>
          </div>
        </nav>
        <div className="container-fluid absolute-center is-responsive">
          <div className="row">
              <div className="col-md-12">
                  <span>Please enter your e-mail address. </span>
              </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <form id="loginForm">
                <div className="form-group input-group">
                  <span className="input-group-addon"><label htmlFor="email">Email:</label></span>
                  <input ref={(input) => this.email = input} className="form-control" type="text" name='email' placeholder="email id" id="email"/>
                </div>
                
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary" onClick={ this.handleSubmit }>Submit</button>
                </div>
               
                { this.props.resetRequestSuccess && (
                  <p> Your password has been emailed to you. Please follow instructions in email to continue logging in.</p>
                  ) }

                   { this.props.resetRequestFailed && (
                  <p> Password reset request failed. Please check whether you entered a valid email ID or contact system administrator</p>
                  ) }

              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  resetRequestSuccess: state.passwordreset.reset_request_successful,
  resetRequestFailed: state.passwordreset.reset_request_failed
  
});

//This will just connect it to the store
const ResetPassword = connect(mapStateToProps)(ResetPasswordUI);
export default ResetPassword;
