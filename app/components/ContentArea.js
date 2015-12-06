import React, {Component} from 'react';

export default class MainContentArea extends React.Component{
  constructor()
  {
    super();
    console.log('getInitialState in ContentArea.js');
    this.state = {children: 'Welcome Screen'};
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps', nextProps.children);
    this.setState({children: nextProps.children});
  }

	render(){
    
    console.log("Content area children:", this.state.children);
		return (
			<div id="main-content-wrapper" className="main__content">
				<div className="container-fluid">
            {this.state.children}
				</div>
			</div>
		);
	}
}
