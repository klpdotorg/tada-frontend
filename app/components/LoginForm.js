import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import {sendLoginToServer} from '../actions/TadaActionCreators';
import { routeActions, push } from 'react-router-redux';

var klplogo = require('../../assets/images/KLP_logo.png');


class Login extends Component{

   constructor(props)
   {
      super(props);
      //var redirectRoute = this.props.location.query.next || '/login';
      this.handleSubmit = this.handleSubmit.bind(this)
   }


  componentWillReceiveProps(nextProps) {

      const { dispatch, authenticated, token, error } = nextProps
      console.log("Login component will receive props", dispatch);

  }

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      this.props.onLoginSubmit(email, pass, this.props.location, this.props.history);

     

      



    }

   

    render() {
      const { authenticated, token, error } = this.props
      console.log("Login render authenticated: ", this.props.authenticated);
      console.log("Login render token: ", this.props.token);
      console.log("Login render error: ", this.props.error);

      return (
        <div id="login-page">
          <nav className="main__header navbar navbar-white navbar-fixed-top">
            <div id="header" className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  <img src={klplogo}/>
                </a>
              </div>

              <div id="navbar" className="navbar-collapse collapse">
                <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
                <p className="navbar-text pull-right">
                <Link to="/login" onClick={this.handleLogin} className="btn btn-primary padded-btn">SIGN UP</Link>
                </p>
              </div>
            </div>
          </nav>

          <div className="container-fluid absolute-center is-responsive">
            <div className="row">
                <div className="col-sm-12 col-md-10 col-md-offset-1">

                  <form id="loginForm">
                    <div className="form-group input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <input ref="email" className="form-control" type="text" name='email' placeholder="email id or username" defaultValue="tada@klp.org.in"/>
                    </div>
                    <div className="form-group input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <input ref="pass" className="form-control" type="password" name='password' placeholder="(HINT: tada)"/>
                    </div>
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </div>
                    <div className="form-group text-center">
                      <a href="#">Forgot Password</a>&nbsp;|&nbsp;<a href="#">Support</a>
                    </div>
                    {this.props.error && (
                      <p>Bad login information. Recheck the username and/or password.</p>
                    )}
                  </form>
                </div>
            </div>
          </div>

        </div>

      )
    }
}

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}

export default Login;
