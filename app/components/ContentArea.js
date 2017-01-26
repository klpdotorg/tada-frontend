import React, { Component } from 'react';
import {connect} from 'react-redux';

class MainContentArea extends React.Component {
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

const mapStateToProps = (state) => {
  return {
    boundaryDetails: state.entities.boundaryDetails,
    boundariesByParentId: state.entities.boundariesByParentId,
    programsById: state.programs.programsById,   
    assessmentsById: state.assessments.assessmentsById,
    questionsById: state.assessments.questionsById,
    modal: state.modal,
    isFetching: state.entities.isFetching
  }
}

export default connect(mapStateToProps)(MainContentArea)
