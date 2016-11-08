import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import { confirmResetPassword } from '../actions';
import { routeActions, push } from 'react-router-redux';

var klplogo = require('../../assets/images/KLP_logo.png');


class SetNewPasswordUI extends Component {

  constructor(props) {
    super(props);
    console.log("Props in reset password", props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {

    const {dispatch, authenticated, token, error} = nextProps;
    console.log("Set new password receiving props", dispatch);
    if(nextProps.pwdResetConfirmed)
    {
      $('#pwdResetConfirmedModal').modal('show');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const new_password = this.refs.pass.value;
    this.props.dispatch(confirmResetPassword(this.props.params.uid, this.props.params.token,new_password));
     // const email = this.refs.email.value;
     // this.props.dispatch(resetPassword(email));
    
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
            </div>
          </div>
        </nav>
        <div className="container-fluid absolute-center is-responsive">
          <div className="row">
              <div className="col-md-12">
                  <span>Please enter your new password. </span>
              </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <form id="loginForm">
                 <div className="form-group input-group">
                  <span className="input-group-addon"><label htmlFor="pass">Password:</label></span>
                  <input id="pass" ref="pass" className="form-control" type="password" name='password' placeholder="" />
                </div>
                 <div className="form-group input-group">
                  <span className="input-group-addon"><label htmlFor="reenterpass">Confirm Password:</label></span>
                  <input id="reenterpass" ref="reenterpass" className="form-control" type="password" name='reenterpassword' placeholder="" />
                </div>
                
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary" onClick={ this.handleSubmit }>Submit</button>
                </div>                               
              </form>
            </div>
          </div>
        </div>
        {/*Pwd reset modal*/}
        <div className="modal fade" data-backdrop="false" id="pwdResetConfirmedModal" tabIndex="-1" role="dialog" aria-labelledby="pwdResetConfirmedModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="changeUserNameTitle"> Password Reset</h4>
                          </div>
                          <div className="modal-body">
                              Your password has been reset successfully. Please login with your new password.
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
                          </div>
                      </div>
                  </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  pwdResetConfirmed: state.passwordreset.reset_confirmed,
  pwdResetRejected: state.passwordreset.reset_rejected
  
});
//This will just connect it to the store
const SetNewPassword = connect()(SetNewPasswordUI);
export default SetNewPassword;
