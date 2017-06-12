import { connect } from 'react-redux';
import MapAssessments from '../components/MapAssessments';

const mapStateToProps = (state, ownProps) => {
  return {
    // state
  };
};

const MapAssessmentsContainer = connect(mapStateToProps)(MapAssessments);

export default MapAssessmentsContainer;
