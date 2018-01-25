import { connect } from 'react-redux';
import { ShowAssessmentsView } from '../../components/MapAssessments';

const mapStateToProps = () => {
  return {
    assessments: [],
    selectedAssessments: [],
  };
};

const ShowAssessments = connect(mapStateToProps, {
  selectAssessment: () => {},
})(ShowAssessmentsView);

export { ShowAssessments };
