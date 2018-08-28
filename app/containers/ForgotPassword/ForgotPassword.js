import { connect } from 'react-redux';
import { ForgotPasswordView } from '../../components/ForgotPassword';
import {
  enableSubmitForm,
  disableSubmitForm,
  generateOTP,
  changeFPMobile,
  changeFPPassword,
  redirect,
} from '../../actions';

const mapStateToProps = (state) => {
  const { password, mobile, otp, mobileError } = state.forgotPassword;
  return {
    password,
    mobile,
    otp,
    canSubmit: state.appstate.enableSubmitForm,
    error: mobileError,
  };
};

const ForgotPassword = connect(mapStateToProps, {
  enableSubmitForm,
  disableSubmitForm,
  submitForm: generateOTP,
  changeMobile: changeFPMobile,
  changePassword: changeFPPassword,
  goTo: redirect,
})(ForgotPasswordView);

export { ForgotPassword };
