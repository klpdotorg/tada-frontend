import { connect } from 'react-redux';
import get from 'lodash.get';
import flatten from 'lodash.flatten';
import { ShowClassesView } from '../../components/MapAssessments';
import { selectClassOfMa } from '../../actions';

const getBoundaries = (state) => {
  const { classes } = state.mapAssessments;
  const values = flatten(Object.values(classes));
  return values.map((id) => {
    return get(state.boundaries.boundaryDetails, id, {});
  });
};

const mapStateToProps = (state) => {
  const { selectedClasses } = state.mapAssessments;

  return {
    classes: getBoundaries(state),
    selectedClasses,
    loading: state.appstate.loadingStudentgroupInMa,
  };
};

const ShowClasses = connect(mapStateToProps, {
  selectClass: selectClassOfMa,
})(ShowClassesView);

export { ShowClasses };
