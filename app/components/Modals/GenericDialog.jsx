import React, { Component } from 'react';
import Modal from 'react-modal';

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
				<Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onClose}>
				<div className="modal-dialog" role="document">
            		<div className="modal-content">
                		<div className="modal-header">
                    		<button type="button" className="close" onClick={this.props.onClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    		<h4 className="modal-title" id="title">{this.props.title}</h4>
                		</div>
                		<div className="modal-body">
                			<p>{this.props.message}</p>
                		</div>
                		<div className="modal-footer">
                 		 <button type="button" className="btn btn-primary" onClick={this.props.onClose}>OK</button>                 		 
              		 </div>
              		</div>
              	</div>
			</Modal>
			);
	}
}