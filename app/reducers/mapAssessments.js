import { nodeDepth, getParentId } from './utils';
import { uniq, omit, without } from 'lodash';

export function mapAssessments(
  state = {
    boundaries: {
      boundaryDetails: {
        1: {
          depth: 0,
        },
      },
      boundariesByParentId: {},
      isFetching: {},
    },
    clusterIds: [],
    institutionIds: [],
    showClusterInstitutions: false,
    fetchingClusters: false,
    fetchingInstitutions: false,
    selectAllClusters: false,
    selectAllInstitutions: false,
    selected: {
      navTreeBoundary: {},
      programId: {},
      assessmentIds: {},
      classIds: {},
      assessmentTypeId: {},
      boundaryCategory: {},
      clusters: [],
      institutions: [],
    },
  },
  action,
) {
  try {
    switch (action.type) {
      case 'SET_BOUNDARIES':
        if (action.payload.results.length > 0) {
          const boundaries = processBoundaryDetails(
            action.payload.results,
            state.boundaries.boundariesByParentId,
            state.boundaries.boundaryDetails,
          );

          return {
            ...state,
            ...{
              boundaries: boundaries,
            },
          };
        }

        return state;

      case 'TOGGLE_MA_NODE':
        const boundary = _.clone(state.boundaries.boundaryDetails[action.id]);
        if (action.open) {
          boundary.collapsed = !action.open;
        } else {
          boundary.collapsed = !boundary.collapsed;
        }

        const details = {
          ...state.boundaries.boundaryDetails,
          ...{ [action.id]: boundary },
        };

        const boundaries = {
          ...state.boundaries,
          ...{ boundaryDetails: details },
        };

        return {
          ...state,
          ...{ boundaries: boundaries },
        };

      case 'SET_PROGRAM_IN_MA':
        const selected = {
          ...state.selected,
          ...{ programId: action.value },
        };

        return {
          ...state,
          ...{ selected: selected },
        };

      case 'SET_ASSESSMENT_TYPE_IN_MA':
        const selectedAssessmentType = {
          ...state.selected,
          ...{ assessmentTypeId: action.value },
        };

        return {
          ...state,
          ...{ selected: selectedAssessmentType },
        };

      case 'SET_MA_CLUSTERS':
        const clusterIds = _.map(action.payload.results, i => {
          return i.id;
        });
        const clusterBoundaryDetails = getBoundariesDetails(
          action.payload.results,
          state.boundaries.boundaryDetails,
        );
        const clusterBoundaries = {
          ...state.boundaries,
          ...{ boundaryDetails: clusterBoundaryDetails },
        };

        return {
          ...state,
          ...{
            clusterIds: clusterIds,
            institutionIds: [],
            selectAllClusters: false,
            selectAllInstitutions: false,
            showClusterInstitutions: false,
            fetchingClusters: false,
            boundaries: clusterBoundaries,
          },
        };

      case 'SET_MA_INSTITUTIONS':
        const ids = _.map(action.payload.results, i => {
          return i.id;
        });
        const institutionBoundaryDetails = getBoundariesDetails(
          action.payload.results,
          state.boundaries.boundaryDetails,
        );
        const institutionBoundaries = {
          ...state.boundaries,
          ...{ boundaryDetails: institutionBoundaryDetails },
        };

        let institutionIds = [];

        if (action.addInstitution) {
          institutionIds = _.uniq([...state.institutionIds, ...ids]);
        } else {
          institutionIds = ids;
        }

        return {
          ...state,
          ...{
            institutionIds: institutionIds,
            boundaries: institutionBoundaries,
            fetchingInstitutions: false,
          },
        };

      case 'SELECT_MA_BOUNDARY_CATEGORY':
        const selectedBoundary = {
          ...state.selected,
          ...{
            boundaryCategory: action.id,
          },
        };

        return {
          ...state,
          ...{
            selected: selectedBoundary,
          },
        };

      case 'SELECT_MA_CLUSTER':
        const addedClusters = [...state.selected.clusters, action.id];

        const selectedClusters = {
          ...state.selected,
          ...{
            clusters: addedClusters,
          },
        };

        return {
          ...state,
          ...{
            selected: selectedClusters,
            showClusterInstitutions: true,
          },
        };

      case 'SELECT_MA_INSTITUTION':
        const addedInstitutions = [...state.selected.institutions, action.id];

        const selectedInstitutions = {
          ...state.selected,
          ...{
            institutions: addedInstitutions,
          },
        };

        return {
          ...state,
          ...{
            selected: selectedInstitutions,
          },
        };

      case 'FETCHING_MA_CLUSTERS':
        return {
          ...state,
          ...{
            fetchingClusters: true,
          },
        };

      case 'FETCHING_MA_INSTITUTIONS':
        return {
          ...state,
          ...{
            fetchingInstitutions: true,
          },
        };

      case 'UNSELECT_MA_CLUSTER':
        const removedClusters = without(state.selected.clusters, action.id);

        const updatedSelectedClusters = {
          ...state.selected,
          ...{
            clusters: removedClusters,
          },
        };

        return {
          ...state,
          ...{
            selected: updatedSelectedClusters,
            showClusterInstitutions: removedClusters.length ? true : false,
          },
        };

      case 'UNSELECT_MA_INSTITUTION':
        const removedInstitutions = without(state.selected.institutions, action.id);

        const updatedSelectedInstitutions = {
          ...state.selected,
          ...{
            clusters: removedInstitutions,
          },
        };

        return {
          ...state,
          ...{
            selected: updatedSelectedInstitutions,
          },
        };
      case 'SELECT_ALL_MA_CLUSTERS':
        const allClustersForSelect = _.clone(state.clusterIds);
        const allClusters = {
          ...state.selected,
          ...{
            clusters: allClustersForSelect,
          },
        };

        return {
          ...state,
          ...{
            selected: allClusters,
            showClusterInstitutions: true,
            selectAllClusters: true,
          },
        };
      case 'SELECT_ALL_MA_INSTITUTIONS':
        const allInstitutionsForSelect = _.clone(state.institutionIds);
        const allInstitutions = {
          ...state.selected,
          ...{
            institutions: allInstitutionsForSelect,
          },
        };

        return {
          ...state,
          ...{
            selected: allInstitutions,
            selectAllInstitutions: true,
          },
        };

      case 'UNSELECT_ALL_MA_CLUSTERS':
        const unselectAllClusters = {
          ...state.selected,
          ...{
            clusters: [],
          },
        };

        return {
          ...state,
          ...{
            selected: unselectAllClusters,
            selectAllClusters: false,
            showClusterInstitutions: false,
          },
        };

      case 'UNSELECT_ALL_MA_INSTITUTIONS':
        const unselectAllInstitutions = {
          ...state.selected,
          ...{
            institutions: [],
          },
        };

        return {
          ...state,
          ...{
            selected: unselectAllInstitutions,
            selectAllInstitutions: false,
          },
        };

      default:
        return state;
    }
  } catch (exception) {
    console.log(exception);
    console.log(state);
  }
}

function processBoundaryDetails(data, boundariesByParentId, boundaryDetails) {
  let init = {
    parents: _.clone(boundariesByParentId),
    details: _.clone(boundaryDetails),
  };

  const parentId = getParentId(data[0]);

  const processed = data.reduce((soFar, boundary) => {
    soFar.parents[parentId] = _.union([boundary.id], soFar.parents[parentId]);
    if (soFar.details[boundary.id] == undefined) {
      boundary.collapsed = true;
    }
    boundary = nodeDepth(boundary);

    soFar.details[boundary.id] = { ...soFar.details[boundary.id], ...boundary };
    return soFar;
  }, init);

  return {
    boundariesByParentId: processed.parents,
    boundaryDetails: processed.details,
  };
}

function getBoundariesDetails(data, boundaryDetails) {
  _.forEach(data, value => {
    boundaryDetails[value.id] = value;
  });

  return boundaryDetails;
}
