import RegistrationForm from '../components/RegistrationForm';
import { connect } from 'react-redux';
import { sendRegisterUser } from '../actions/';

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.userregistration.error,
    registered: state.userregistration.registered,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegistrationSubmit: (email, pass, username) => {      
      dispatch(sendRegisterUser(email, pass, username))
    }
  }
}

const UserRegContainer = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export default UserRegContainer;
