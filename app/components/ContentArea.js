import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProgramsBySchoolType } from '../selectors';

class MainContentArea extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // console.log(this.props);
  }
  render() {
    return (
      <div id="main-content-wrapper" className="main__content">
        <div className="container-fluid">

          {React.cloneElement(this.props.children, { ...this.props })}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boundaries: state.boundaries,
    boundaryDetails: state.boundaries.boundaryDetails,
    boundariesByParentId: state.boundaries.boundariesByParentId,
    programsById: getProgramsBySchoolType(state),
    assessmentsById: state.assessments.assessmentsById,
    questionsById: state.assessments.questionsById,
    modal: state.modal,
    permissions: state.login.permissions,
    programs: state.programs,
    primarySelected: state.schoolSelection.primarySchool,
  };
};

export default connect(mapStateToProps)(MainContentArea);
