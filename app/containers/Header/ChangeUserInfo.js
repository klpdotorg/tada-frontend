import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import {
  closeChangeUserInfoModal,
  enableChangeUserInfoForm,
  disableChangeUserInfoForm,
  changeUserInfo,
} from '../../actions';

import { Modal } from '../../components/Modal';

const { Input } = FRC;

class ChangeUserInfoScreen extends Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const myform = this.myform.getModel();

    this.props.changeUserInfo(myform.password);
  }

  render() {
    return (
      <Modal
        title="Change Profile"
        contentLabel="Change Profile"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.closeChangeUserInfoModal}
        canSubmit={this.props.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel.."
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.props.enableChangeUserInfoForm}
          onInvalid={this.props.disableChangeUserInfoForm}
          ref={ref => {
            this.myform = ref;
          }}
        >
          <Input
            name="email"
            id="email"
            type="text"
            label="E-mail"
            validations="isEmail,minLength:1"
            defaultValue={this.props.email}
          />
          <Input
            name="firstName"
            id="firstName"
            type="text"
            label="First Name"
            validations="isAlpha"
            defaultValue={this.props.firstname}
          />
          <Input
            name="lastName"
            id="lastName"
            type="text"
            label="Last Name"
            validations="isAlpha"
            defaultValue={this.props.lastname}
          />
          <Input name="phone" id="phone" type="text" label="Mobile" validations="isNumeric" />
        </Formsy.Form>
      </Modal>
    );
  }
}

ChangeUserInfoScreen.propTypes = {
  isOpen: PropTypes.bool,
  canSubmit: PropTypes.bool,
  email: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  closeChangeUserInfoModal: PropTypes.func,
  enableChangeUserInfoForm: PropTypes.func,
  disableChangeUserInfoForm: PropTypes.func,
  changeUserInfo: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.header.changeUserInfoModal,
  email: state.login.email,
  firstName: state.login.firstName,
  lastName: state.login.lastName,
  canSubmit: state.header.enableChangeUserInfoForm,
});

const ChangeUserInfo = connect(mapStateToProps, {
  closeChangeUserInfoModal,
  enableChangeUserInfoForm,
  disableChangeUserInfoForm,
  changeUserInfo,
})(ChangeUserInfoScreen);

export { ChangeUserInfo };

// import React, { Component } from 'react';
// import Modal from './ModalTemplate';
// import Formsy from 'formsy-react';
// import FRC from 'formsy-react-components';
// import { modalStyle as customStyles } from '../../styles.js';
//
//
// const { Input, Select } = FRC;
//
//
//
// export default class ChangeUserInfo extends Component {
// 	constructor(props)
// 	{
// 		super(props);
// 		this.state = {
// 			disabled: false,
// 			canSubmit:false
// 		}
// 		this.enableSubmitButton = this.enableSubmitButton.bind(this);
// 		this.disableSubmitButton = this.disableSubmitButton.bind(this);
// 		this.submitForm = this.submitForm.bind(this);
// 	}
//
// 	submitForm()
// 	{
// 		var myform = this.myform.getModel();
//
// 		this.props.handleSubmit(myform.email, myform.firstName, myform.lastName, myform.phone);
// 	}
//
// 	enableSubmitButton() {
// 		this.setState({
// 			canSubmit:true
// 		})
// 	}
//
// 	disableSubmitButton(){
// 		this.setState({
// 			canSubmit: false
// 		})
// 	}
//
// 	render()
// 	{
//
// 		return(
//       <Modal
//         title='Change Profile'
//         contentLabel='Change Profile'
//         isOpen={this.props.isOpen}
//         onCloseModal={this.props.onCloseModal}
//         canSubmit={this.state.canSubmit}
//         submitForm={this.submitForm}
//         cancelBtnLabel='Cancel..'
//       >
//         <Formsy.Form onValidSubmit={this.submitForm} onValid={this.enableSubmitButton} onInvalid={this.disableSubmitButton}
//             disabled={this.state.disabled} ref={(ref) => this.myform = ref}>
//           <Input name="email" id="email" type="text" label="E-mail"  validations="isEmail,minLength:1" defaultValue={this.props.email}/>
//           <Input name="firstName" id="firstName" type="text" label="First Name" validations="isAlpha" defaultValue={this.props.firstname}/>
//           <Input name="lastName" id="lastName" type="text" label="Last Name"  validations="isAlpha" defaultValue={this.props.lastname}/>
//           <Input name="phone" id="phone" type="text" label="Mobile" validations="isNumeric"/>
//
//         </Formsy.Form>
// 			</Modal>
// 			);
// 	}
// }
