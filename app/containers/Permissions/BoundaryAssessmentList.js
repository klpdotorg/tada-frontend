import { connect } from 'react-redux';
import { BoundaryAssessmentListView } from '../../components/Permissions';

const BoundaryAssessmentList = connect()(BoundaryAssessmentListView);

export { BoundaryAssessmentList };
