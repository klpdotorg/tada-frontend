import { connect } from 'react-redux';
import { ShowInstitutionsView } from '../../components/MapAssessments';

const mapStateToProps = () => {
  return {
    institutions: [],
    selectedInstitution: [],
    selectedAllInstitutions: false,
  };
};

const ShowInstitutions = connect(mapStateToProps, {
  selectedAllInstitutions: () => {},
  selectInstitution: () => {},
})(ShowInstitutionsView);

export { ShowInstitutions };
