import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { LoginPageWrapper } from '../../components/Login';

import { sendLoginToServer } from '../../actions/';

class Login extends Component {
  constructor(prop) {
    super(prop);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.email.value;
    const pass = this.pass.value;

    this.props.sendLoginToServer(email, pass);
  }

  render() {
    const { loginIn, error } = this.props;

    return (
      <LoginPageWrapper error={error}>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-md-offset-1">
            <form id="loginForm">
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user" />
                </span>
                <input
                  ref={(input) => {
                    this.email = input;
                  }}
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="email id or username"
                  defaultValue=""
                />
              </div>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock" />
                </span>
                <input
                  ref={(input) => {
                    this.pass = input;
                  }}
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="(HINT: tada)"
                />
              </div>
              {loginIn ? (
                <div className="text-center">
                  <i className="fa fa-cog fa-spin fa-lg fa-fw" />
                  <span>Logging...</span>
                </div>
              ) : (
                <div />
              )}
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                  Submit
                </button>
              </div>
              <div className="form-group text-center">
                <Link to="/password/reset">Forgot Password</Link>&nbsp;|&nbsp;<a href="mailto:dev@klp.org.in">Support</a>
              </div>
            </form>
          </div>
        </div>
      </LoginPageWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.login.error,
    loginIn: state.login.isLoggingIn,
  };
};

Login.propTypes = {
  error: PropTypes.bool.isRequired,
  loginIn: PropTypes.bool,
  sendLoginToServer: PropTypes.func,
};

const LoginContainer = connect(mapStateToProps, { sendLoginToServer })(Login);

export { LoginContainer };
