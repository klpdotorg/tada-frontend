import { connect } from 'react-redux';
import { ShowClassesView } from '../../components/MapAssessments';

const mapStateToProps = () => {
  return {
    classes: [],
    selectedClasses: [],
  };
};

const ShowClasses = connect(mapStateToProps, {
  selectClass: () => {},
})(ShowClassesView);

export { ShowClasses };
