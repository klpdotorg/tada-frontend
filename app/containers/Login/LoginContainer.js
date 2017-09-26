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

    const email = this.refs.email.value;
    const pass = this.refs.pass.value;

    this.props.sendLoginToServer(email, pass);
  }

  render() {
    return (
      <LoginPageWrapper error={this.props.error}>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-md-offset-1">
            <form id="loginForm">
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user" />
                </span>
                <input
                  autoFocus
                  ref="email"
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
                  ref="pass"
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="(HINT: tada)"
                />
              </div>
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

const mapStateToProps = state => ({
  error: state.login.error,
});

Login.propTypes = {
  error: PropTypes.bool.isRequired,
  sendLoginToServer: PropTypes.func,
};

const LoginContainer = connect(mapStateToProps, { sendLoginToServer })(Login);

export { LoginContainer };
