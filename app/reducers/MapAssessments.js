import {
  SELECT_ASSESSMENT_OF_MA,
  SELECT_ASSESSMENT_TYPE_OF_MA,
  SET_INSTITUTIONS_OF_MA,
  SELECT_INSTITUTION_OF_MA,
  SELECT_CLUSTER_OF_MA,
  SET_CLUSTERS_INDEX_OF_MA,
  SET_INSTITUTIONS_INDEX_OF_MA,
  SET_STUDENTGROUPS_OF_MA,
  SELECT_CLASS_OF_MA,
  RESET_MAP_ASSESSMENTS,
  RESET_INSTITUTIONS_OF_MA,
  RESET_STUDENTGROUPS_OF_MA,
  RESET,
  SET_MAP_ASSESSMENT_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  selectedAssessments: [],
  selectedAssessmentType: 1,
  institutionsIndex: null,
  clustersIndex: null,
  selectedInstitutions: [],
  selectedClasses: [],
  selectedClusters: [],
  institutions: {},
  selectedEntityId: null,
  classes: {},
  loading: false,
  error: {},
};

const MapAssessments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ASSESSMENT_OF_MA:
      return {
        ...state,
        selectedAssessments: action.value,
      };
    case SELECT_ASSESSMENT_TYPE_OF_MA:
      return {
        ...state,
        selectedAssessmentType: action.value,
      };
    case SET_CLUSTERS_INDEX_OF_MA:
      return {
        ...state,
        selectedEntityId: action.id,
        clustersIndex: action.index,
      };
    case SET_INSTITUTIONS_INDEX_OF_MA:
      return {
        ...state,
        institutionsIndex: action.index,
        selectedEntityId: action.id,
        institutions: [],
      };
    case RESET_INSTITUTIONS_OF_MA:
      return {
        ...state,
        institutions: {},
      };
    case RESET_STUDENTGROUPS_OF_MA:
      return {
        ...state,
        classes: {},
      };
    case SET_INSTITUTIONS_OF_MA:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          ...action.value,
        },
      };
    case SET_STUDENTGROUPS_OF_MA:
      return {
        ...state,
        classes: {
          ...state.classes,
          ...action.value,
        },
      };
    case SELECT_INSTITUTION_OF_MA:
      return {
        ...state,
        selectedInstitutions: action.value,
      };
    case SELECT_CLUSTER_OF_MA:
      return {
        ...state,
        selectedClusters: action.value,
      };
    case SELECT_CLASS_OF_MA:
      return {
        ...state,
        selectedClasses: action.value,
      };
    case RESET_MAP_ASSESSMENTS:
      return INITIAL_STATE;
    case SET_MAP_ASSESSMENT_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { MapAssessments };
