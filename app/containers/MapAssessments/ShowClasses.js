import { connect } from 'react-redux';
import get from 'lodash.get';
import flatten from 'lodash.flatten';
import Loadable from 'react-loadable';
import { selectClassOfMa } from '../../actions';
import { Loading } from '../../components/common';

const ShowClassesView = Loadable({
  loader: () => {
    return import('../../components/MapAssessments/ShowClasses');
  },
  loading: Loading,
});

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
