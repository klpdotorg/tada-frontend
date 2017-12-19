import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { AssessmentTable } from '../../components/Assessments';
import { getAssessments } from '../../actions';

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
  const programId = state.programs.selectedProgram;
  const assessments = map(state.assessments.assessments, (assessment) => {
    return assessment.id;
  });

  return {
    programId: Number(programId),
    assessments,
  };
};

const Assessments = connect(mapStateToProps, { getAssessments })(GetAssessments);

export { Assessments };
