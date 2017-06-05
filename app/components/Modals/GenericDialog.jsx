import React, { Component } from 'react';
import Modal from './ModalTemplate';
import { modalStyle as customStyles } from '../../styles.js';


/*
Pass in a 'title' and a 'message' via props and it renders a simple dialog box with a "OK" message.
 */
export default class GenericDialog extends Component{

	constructor(props)
	{
		super(props);
	}

	render()
	{
			return(
        <Modal
          title={this.props.title}
          contentLabel={this.props.title}
          isOpen={this.props.isOpen}
          onCloseModal={this.props.onCloseModal}
          canSubmit={true}
          submitForm={this.props.onCloseModal}
          submitBtnLabel='OK'
          hideCancelBtn={true}
        >
          <p>{this.props.message}</p>
			</Modal>
			);
	}
}
