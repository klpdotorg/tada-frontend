import { connect } from 'react-redux';
import { get, flatten } from 'lodash';

import { selectInstitutionOfMA, selectAllInstitutionsOfMA } from '../../actions';
import { ShowInstitutionsView } from '../../components/MapAssessments';

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
