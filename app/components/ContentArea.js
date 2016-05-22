import React, { Component } from 'react';

export default class MainContentArea extends React.Component {
  constructor() {
    super();
  }

  /* Called just before a component is mounted for the first time. Using this to render the default Welcome screen (IndexRoute)*/
  componentWillMount() {
    console.log('componentWillMount in MainContentArea', this.props.children);
  }

  /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.children);
  }

  render() {
    return (
      <div id="main-content-wrapper" className="main__content">
        <div className="container-fluid">
          { React.cloneElement(this.props.children, {
              boundaryDetails: this.props.boundaryDetails
            }) }
        </div>
      </div>
      );
  }
}
