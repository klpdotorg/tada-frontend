import { connect } from 'react-redux';
import { ShowAssessmentTypesView } from '../../components/MapAssessments';
import { AssessmentTypes } from '../../Data';
import { selectAssessmentTypeOfMA } from '../../actions';

const mapStateToProps = (state) => {
  return {
    assessmentTypes: AssessmentTypes,
    selectedType: state.mapAssessments.selectedAssessmentType,
  };
};

const ShowAssessmentTypes = connect(mapStateToProps, {
  changeAssessmentType: selectAssessmentTypeOfMA,
})(ShowAssessmentTypesView);

export { ShowAssessmentTypes };
