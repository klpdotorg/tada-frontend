import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { getAssessments, selectAssessmentOfMA, resetAssessmentsOfMA } from '../../actions';
import { Loading } from '../../components/common';

const ShowAssessmentsView = Loadable({
  loader: () => {
    return import('../../components/MapAssessments/ShowAssessments');
  },
  loading: Loading,
});

class GetAssessments extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.programId !== nextProps.programId) {
      this.props.resetAssessments();
      this.props.getAssessments(nextProps.programId);
    }
  }

  render() {
    return <ShowAssessmentsView {...this.props} />;
  }
}

GetAssessments.propTypes = {
  programLength: PropTypes.number,
  assessments: PropTypes.array,
  programId: PropTypes.number,
  getAssessments: PropTypes.func,
  resetAssessments: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { assessments, loading } = state.assessments;
  return {
    assessments: Object.values(assessments),
    loading,
    selectedAssessments: state.mapAssessments.selectedAssessments,
    programId: Number(state.programs.selectedProgram),
    programLength: Object.values(state.programs.programs).length,
  };
};

const ShowAssessments = connect(mapStateToProps, {
  selectAssessment: selectAssessmentOfMA,
  resetAssessments: resetAssessmentsOfMA,
  getAssessments,
})(GetAssessments);

export { ShowAssessments };
