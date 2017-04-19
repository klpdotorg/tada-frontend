import React, { Component } from 'react';
import Modal from 'react-modal';
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
				<Modal contentLabel={this.props.title} isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal} style={customStyles}>
				<div className="" role="document">
            		<div className="modal-content">
                		<div className="modal-header">
                    		<button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    		<h4 className="modal-title" id="title">{this.props.title}</h4>
                		</div>
                		<div className="modal-body">
                			<p>{this.props.message}</p>
                		</div>
                		<div className="modal-footer">
                 		 <button type="button" className="btn btn-primary" onClick={this.props.onCloseModal}>OK</button>                 		 
              		 </div>
              		</div>
              	</div>
			</Modal>
			);
	}
}