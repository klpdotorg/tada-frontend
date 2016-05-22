import Login from '../components/LoginForm';
import { connect } from 'react-redux';
import { sendLoginToServer, fetchUserData } from '../actions/';

const mapStateToProps = (state) => {
  console.log("mapStateToProps called", state);
  return {
    error: state.login.error,
    token: state.login.token,
    authenticated: state.login.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSubmit: (email, pass, location, history) => {


      dispatch(sendLoginToServer(email, pass)).then(() => {
        fetchUserData(sessionStorage.token)
      })
        .then(() => {

          if (location.state && location.state.nextPathname) {
            history.replace(location.state.nextPathname);
          } else {
            history.replace('/');
          }
        })
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
