import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash.map';
import isEmpty from 'lodash.isempty';

import { AssessmentTable } from '../../components/Assessments';
import {
  getAssessments,
  openDeactivateAssessmentsModal,
  deactivateAssessments,
  openDeleteAssessmentsModal,
  deleteAssessments,
} from '../../actions';

class GetAssessments extends Component {
  componentDidMount() {
    const { programId } = this.props;
    this.props.getAssessments(programId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.programId !== nextProps.programId) {
      this.props.getAssessments(nextProps.programId);
    }
  }

  render() {
    return <AssessmentTable {...this.props} />;
  }
}

GetAssessments.propTypes = {
  getAssessments: PropTypes.func,
  programId: PropTypes.number,
};

const mapStateToProps = (state) => {
  const { selectedAssessments } = state.assessments;
  const programId = state.programs.selectedProgram;
  const assessments = map(state.assessments.assessments, (assessment) => {
    return assessment.id;
  });

  return {
    programId: Number(programId),
    assessments,
    canEdit: isEmpty(selectedAssessments),
  };
};

const Assessments = connect(mapStateToProps, {
  getAssessments,
  openDeactivateAssessmentsModal,
  deactivateAssessments,
  openDeleteAssessmentsModal,
  deleteAssessments,
})(GetAssessments);

export { Assessments };
