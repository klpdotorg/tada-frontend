import { connect } from 'react-redux';
import get from 'lodash.get';
import flatten from 'lodash.flatten';
import Loadable from 'react-loadable';

import { selectInstitutionOfMA, selectAllInstitutionsOfMA } from '../../actions';
import { Loading } from '../../components/common';

const ShowInstitutionsView = Loadable({
  loader: () => {
    return import('../../components/MapAssessments/ShowInstitutions');
  },
  loading: Loading,
});

const getBoundaries = (state) => {
  const { institutions } = state.mapAssessments;
  const values = flatten(Object.values(institutions));
  if (values.length) {
    return values.map((id) => {
      return {
        uniqueId: id,
        value: state.boundaries.boundaryDetails[id] || {},
      };
    });
  }

  const boundaryIds = get(
    state.boundaries.boundariesByParentId,
    state.mapAssessments.institutionsIndex,
    [],
  );

  return boundaryIds.map((id) => {
    return {
      uniqueId: id,
      value: state.boundaries.boundaryDetails[id],
    };
  });
};

const mapStateToProps = (state) => {
  const { selectedInstitutions, clustersIndex } = state.mapAssessments;

  return {
    institutions: getBoundaries(state),
    selectedInstitutions,
    selectedAllInstitutions: false,
    loading:
      clustersIndex > 0 ? state.appstate.loadingInstitutionInMA : state.appstate.loadingBoundary,
  };
};

const ShowInstitutions = connect(mapStateToProps, {
  selectAllInstitutions: selectAllInstitutionsOfMA,
  selectInstitution: selectInstitutionOfMA,
})(ShowInstitutionsView);

export { ShowInstitutions };
