import React, {Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import TadaStore from '../stores/TadaStore';
import {sendLoginToServer} from '../actions/TadaActionCreators2';

var klplogo = require('../../assets/images/KLP_logo.png');


class Login extends Component {

   constructor(props) {
      super(props);
      var redirectRoute = this.props.location.query.next || '/login';
      this.handleSubmit = this.handleSubmit.bind(this)
   }

  componentDidMount() {
    const { dispatch } = this.props
    console.log("Login component did mount", dispatch);
  }

  componentWillReceiveProps(nextProps) {

      const { dispatch } = nextProps
      console.log("Login component will receive props", dispatch);

  }

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      const {dispatch} = this.props;

      dispatch(sendLoginToServer(email,pass)).then(() => {
        const { location } = this.props;



        if (location.state && location.state.nextPathname) {
           this.props.history.replaceState(null, location.state.nextPathname);
           //dispatch(push(location.state.nextPathname));
        } else {
            this.props.history.replaceState(null, '/');
           //dispatch(push('/'));
        }
      });

      //this.fetchuserData(sessionStorage.token);



    }

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

    }

    requireAuth(nextState, replaceState)
    {
      const {authenticated} = this.props;
      console.log("is logged in", authenticated);
      if (!authenticated)
      {
        console.log("NEXT STATE:", nextState.location.pathname);
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
      }
    }

    render() {
      const { authenticated, token, error } = this.props;
      console.log("Login render authenticated: ", authenticated);
      console.log("Login render token: ", token);
      console.log("Login render error: ", error);

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
                    {error && (
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



function mapStateToProps(state) {
  const { authenticated, auth_token } = state
  return {
    authenticated,
    auth_token
  }
}

export default connect(mapStateToProps)(Login)
