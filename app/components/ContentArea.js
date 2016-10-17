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
    console.log("ContentArea is receiving new props", nextProps);
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
    programsByInstitutionId: state.programs.programsByInstitutionId,
    programsByStudentId: state.programs.programsByStudentId,
    institutionAssessmentsByProgramId: state.assessments.institutionAssessmentsByProgramId,
    studentAssessmentsByProgramId: state.assessments.studentAssessmentsByProgramId,
    modal: state.modal,
    isFetching: state.entities.isFetching
  }
}

export default connect(mapStateToProps)(MainContentArea)
