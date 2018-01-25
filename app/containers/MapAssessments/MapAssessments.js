import { connect } from 'react-redux';
import { MapAssessmentsView } from '../../components/MapAssessments';

const MapAssessments = connect()(MapAssessmentsView);

export { MapAssessments };
