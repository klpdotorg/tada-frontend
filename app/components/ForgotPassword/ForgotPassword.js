import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { EnterOTP, EnterPassword } from '../../containers/ForgotPassword';

const klplogo = require('../../css/images/KLP_logo.png');

const { Input } = FRC;

class ForgotPasswordView extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.changeMobile(myform.mobileno);
    this.props.submitForm();
  }

  render() {
    const { canSubmit, error } = this.props;

    return (
      <div id="login-page">
        <nav className="main__header navbar navbar-white navbar-fixed-top">
          <div id="header" className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <img src={klplogo} alt="logo" />
              </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
              <p className="navbar-text pull-right">
                <button
                  className="btn btn-primary padded-btn"
                  onClick={() => {
                    this.props.goTo('/login');
                  }}
                >
                  LOGIN
                </button>
              </p>
            </div>
          </div>
        </nav>
        <div className="container-fluid absolute-center is-responsive" style={{ maxWidth: '50%' }}>
          <div className="row">
            <div className="col-md-12">
              <h4 className="forgot-password-header">Please enter your Mobile Number.</h4>
            </div>
          </div>
          <p className="forgot-password-error">{error}</p>
          <div className="row">
            <Formsy.Form
              onValidSubmit={this.submitForm}
              onValid={this.props.enableSubmitForm}
              onInvalid={this.props.disableSubmitForm}
              ref={(ref) => {
                this.myform = ref;
              }}
            >
              <Input
                name="mobileno"
                id="mobileno"
                value=""
                label="Mobile No."
                type="tel"
                validations={{
                  myCustomIsFiveValidation: (values, value) => {
                    return value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
                      ? true
                      : '';
                  },
                }}
                required
              />
            </Formsy.Form>
            <div className="forgot-password-button-cont">
              <button
                type="button"
                disabled={!canSubmit}
                className="btn btn-primary"
                onClick={this.submitForm}
                style={{ width: 200 }}
              >
                Save
              </button>
            </div>
          </div>
          <EnterOTP />
          <EnterPassword />
        </div>
      </div>
    );
  }
}

ForgotPasswordView.propTypes = {
  goTo: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  changeMobile: PropTypes.func,
  canSubmit: PropTypes.bool,
  submitForm: PropTypes.func,
  error: PropTypes.string,
};

export { ForgotPasswordView };
