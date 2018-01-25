import { connect } from 'react-redux';
import { ShowAssessmentTypesView } from '../../components/MapAssessments';

const mapStateToProps = () => {
  return {
    assessmentTypes: [],
    selectedType: null,
  };
};

const ShowAssessmentTypes = connect(mapStateToProps, {
  changeAssessmentType: () => {},
})(ShowAssessmentTypesView);

export { ShowAssessmentTypes };
