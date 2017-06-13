import { connect } from 'react-redux';
import MapAssessments from '../components/MapAssessments';

const mapStateToProps = (state, ownProps) => {
  return {
    programs: state.programs.programsById,
    programId: state.mapAssessments.selected.programId,
    primarySelected: state.schoolSelection.primarySchool,
    assessmentTypeId: state.mapAssessments.selected.assessmentTypeId,
    assessments: state.assessments.assessmentsById,
    fetchingAssessments: state.assessments.isFetching,
  };
};

const MapAssessmentsContainer = connect(mapStateToProps)(MapAssessments);

export default MapAssessmentsContainer;
