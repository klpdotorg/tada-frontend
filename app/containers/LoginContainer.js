import Login from '../components/LoginForm';
import { connect } from 'react-redux';
import { sendLoginToServer, fetchUserData } from '../actions/';

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.login.error,
    token: state.login.token,
    authenticated: state.login.authenticated,
    location: ownProps.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSubmit: (email, pass, location) => {
      console.log('location', location)
      dispatch(sendLoginToServer(email, pass))
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
