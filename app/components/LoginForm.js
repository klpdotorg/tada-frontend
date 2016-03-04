import React from 'react';
import { render } from 'react-dom';
import { browserHistory, History, Router, Route, Link } from 'react-router';
import auth from './Auth';
import TadaStore from '../stores/TadaStore';
var klplogo = require('../../assets/images/KLP_logo.png');

const Login = React.createClass({

   mixins: [ History ],

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true });
      console.log("Session storage token is", sessionStorage.token);
      this.fetchuserData(sessionStorage.token);
        const { location } = this.props;
        
        if (location.state && location.state.nextPathname) {
          this.history.replaceState(null, location.state.nextPathname);

        } else {
          this.history.replaceState(null, '/');
        }
      })
    },

    fetchuserData(token)
    {
      $.ajax({
        type: "GET",
        url: "http://tadadev.klp.org.in/auth/me/",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token ' + token);},
        success: function(data){
          TadaStore.setUserData(data);
          sessionStorage.setItem("userdata",JSON.stringify(data));
        }       
      });

    },

    render() {
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
                      <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                    <div className="form-group text-center">
                      <a href="#">Forgot Password</a>&nbsp;|&nbsp;<a href="#">Support</a>
                    </div>
                    {this.state.error && (
                      <p>Bad login information. Recheck the username and/or password.</p>
                    )}
                  </form>        
                </div>  
            </div>
          </div>

        </div>
         
      )
    }
})

module.exports = Login;