import React, {Component} from 'react';

export default class MainContentArea extends React.Component{
  constructor()
  {
    super();
    console.log('getInitialState in ContentArea.js');
    this.state = {children: 'Loading..'};
  }

  /* Called just before a component is mounted for the first time. Using this to render the default Welcome screen (IndexRoute)*/
  componentWillMount(){
    console.log('componentWillMount in MainContentArea', this.props.children);
    this.setState({children: this.props.children});
  }

  /* Called when a component is reacting to a props change. Invoked before render is called. */
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
