import React, { Component } from 'react';

export default class MainContentArea extends React.Component {
  constructor() {
    super();
  }

  /* Called just before a component is mounted for the first time. Using this to render the default Welcome screen (IndexRoute)*/
  componentWillMount() {
  }

  /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div id="main-content-wrapper" className="main__content">
        <div className="container-fluid">
          { React.cloneElement(this.props.children, {...this.props}) }
        </div>
      </div>
      );
  }
}
