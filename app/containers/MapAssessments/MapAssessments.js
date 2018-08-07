import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import get from 'lodash.get';

// import { MapAssessmentsView } from '../../components/MapAssessments';
import { mapBoundariesToAssessments } from '../../actions';
import { Loading } from '../../components/common';

const MapAssessmentsView = Loadable({
  loader: () => {
    return import('../../components/MapAssessments/MapAssessments');
  },
  loading: Loading,
});

class ActiveSubmitButton extends Component {
  constructor() {
    super();

    this.activeSubmit = this.activeSubmit.bind(this);
  }

  activeSubmit() {
    const {
      surveyOn,
      selectedInstitutions,
      selectedClasses,
      selectedAssessments,
      institutionsIndex,
      selectedClusters,
    } = this.props;

    if (!selectedAssessments) {
      return false;
    }

    if (selectedInstitutions) {
      return true;
    }

    if ((surveyOn === 'studentgroup' || surveyOn === 'student') && selectedClasses) {
      return true;
    }

    if (surveyOn === 'institution' && institutionsIndex) {
      return true;
    }

    if (surveyOn === 'institution' && selectedClusters.length) {
      return true;
    }

    return false;
  }

  render() {
    return <MapAssessmentsView {...this.props} activeSubmit={this.activeSubmit} />;
  }
}

ActiveSubmitButton.propTypes = {
  assessmentType: PropTypes.number,
  selectedInstitutions: PropTypes.bool,
  selectedClasses: PropTypes.bool,
  selectedAssessments: PropTypes.bool,
  institutionsIndex: PropTypes.any,
  selectedClusters: PropTypes.array,
  surveyOn: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    institutionsIndex,
    clustersIndex,
    selectedClusters,
    selectedInstitutions,
    selectedClasses,
    selectedAssessments,
    error,
  } = state.mapAssessments;
  const { programs, selectedProgram } = state.programs;
  const program = get(programs, selectedProgram, {});

  const showInstitutions = institutionsIndex > 0 || selectedClusters.length > 0;
  return {
    showClusters: clustersIndex > 0,
    selectedInstitutions: selectedInstitutions.length > 0,
    selectedClasses: selectedClasses.length > 0,
    selectedAssessments: selectedAssessments.length > 0,
    selectedClusters,
    institutionsIndex,
    showInstitutions,
    error,
    surveyOn: program.survey_on,
  };
};

const MapAssessments = connect(mapStateToProps, {
  mapAssessments: mapBoundariesToAssessments,
})(ActiveSubmitButton);

export { MapAssessments };
