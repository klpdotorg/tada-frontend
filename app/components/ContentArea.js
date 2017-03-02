import React, { Component } from 'react';
import {connect} from 'react-redux';

class MainContentArea extends React.Component {
  constructor() {
    super();
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
    boundaries: state.boundaries,
    boundaryDetails: state.boundaries.boundaryDetails,
    boundariesByParentId: state.boundaries.boundariesByParentId,
    programsById: state.programs.programsById,
    assessmentsById: state.assessments.assessmentsById,
    questionsById: state.assessments.questionsById,
    modal: state.modal
  }
}

export default connect(mapStateToProps)(MainContentArea)
