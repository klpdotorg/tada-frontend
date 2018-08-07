import { SERVER_API_BASE, PER_PAGE } from 'config';
import isEqual from 'lodash.isequal';
import getObject from 'lodash.get';
import isEmpty from 'lodash.isempty';
import flattenDeep from 'lodash.flattendeep';
import uniq from 'lodash.uniq';
import pull from 'lodash.pull';

import Notifications from 'react-notification-system-redux';

import { mapAssessmentsDone, mapAssessmentsFailed, errorNotification } from './notifications';

import {
  SELECT_CLUSTER_OF_MA,
  SELECT_ASSESSMENT_OF_MA,
  SELECT_ASSESSMENT_TYPE_OF_MA,
  SET_INSTITUTIONS_OF_MA,
  SET_STUDENTGROUPS_OF_MA,
  SELECT_INSTITUTION_OF_MA,
  SET_BOUNDARIES,
  SET_CLUSTERS_INDEX_OF_MA,
  SET_INSTITUTIONS_INDEX_OF_MA,
  SELECT_CLASS_OF_MA,
  RESET_MAP_ASSESSMENTS,
  RESET_INSTITUTIONS_OF_MA,
  RESET_STUDENTGROUPS_OF_MA,
  SET_MAP_ASSESSMENT_ERROR,
} from './types';
import {
  fetchBoundary,
  showBoundaryLoading,
  showInstitutionLoadingInMa,
  closeInstitutionLoadingInMa,
  showClassesLoadingInMA,
  closeClassesLoadingInMA,
  toggleSubmitLoading,
} from './index';
import { convertEntitiesToObject } from '../utils';
import { get, post } from './requests';

const showMappingError = () => {
  return (dispatch) => {
    dispatch({
      type: SET_MAP_ASSESSMENT_ERROR,
      value: {
        error: ['The fields institution, questiongroup must make a unique set.'],
      },
    });
    dispatch(Notifications.error(errorNotification('Error!', 'Mapping not done successfully.')));
  };
};

const resetMappingError = () => {
  return {
    type: SET_MAP_ASSESSMENT_ERROR,
    value: {},
  };
};

const fetchStudentGroupOfMA = (entity) => {
  return (dispatch) => {
    dispatch(showClassesLoadingInMA());
    const url = `${SERVER_API_BASE}institutions/${entity.id}/studentgroups/?&per_page=${PER_PAGE}`;

    get(url).then(({ data }) => {
      const entities = convertEntitiesToObject(data.results);

      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });

      dispatch({
        type: SET_STUDENTGROUPS_OF_MA,
        value: {
          [entity.id]: Object.keys(entities),
        },
      });

      dispatch(closeClassesLoadingInMA());
    });
  };
};

const fetchInstitutionOfMA = (entity) => {
  return (dispatch) => {
    dispatch(showInstitutionLoadingInMa());
    const url = `${SERVER_API_BASE}institutions/?admin3=${entity.id}&per_page=${PER_PAGE}`;

    get(url).then(({ data }) => {
      const entities = convertEntitiesToObject(data.results);

      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });

      dispatch({
        type: SET_INSTITUTIONS_OF_MA,
        value: {
          [entity.id]: Object.keys(entities),
        },
      });

      dispatch(closeInstitutionLoadingInMa());
    });
  };
};

export const resetAssessmentsOfMA = () => {
  return {
    type: SELECT_ASSESSMENT_OF_MA,
    value: [],
  };
};

export const selectAllInstitutionsOfMA = (Ids) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedInstitutions } = state.mapAssessments;
    const { programs, selectedProgram } = state.programs;
    const program = getObject(programs, selectedProgram, {});

    if (isEqual(Ids, selectedInstitutions)) {
      dispatch({
        type: SELECT_INSTITUTION_OF_MA,
        value: [],
      });
      dispatch({
        type: RESET_STUDENTGROUPS_OF_MA,
      });
    } else {
      if (program.survey_on === 'student' || program.survey_on === 'studentgroup') {
        Ids.forEach((id) => {
          dispatch(fetchStudentGroupOfMA({ id }));
        });
      }

      dispatch({
        type: SELECT_INSTITUTION_OF_MA,
        value: Ids,
      });
    }
  };
};

export const selectAllClustersOfMA = (entities) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedClusters } = state.mapAssessments;

    const Ids = entities.map((entity) => {
      return entity.uniqueId;
    });

    if (isEqual(Ids, selectedClusters)) {
      dispatch({
        type: SELECT_CLUSTER_OF_MA,
        value: [],
      });
      dispatch({
        type: RESET_INSTITUTIONS_OF_MA,
      });
    } else {
      entities.forEach((entity) => {
        dispatch(fetchInstitutionOfMA(entity));
      });
      dispatch({
        type: SELECT_CLUSTER_OF_MA,
        value: Ids,
      });
    }
  };
};

export const selectAssessmentTypeOfMA = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedInstitutions } = state.mapAssessments;
    const { programs, selectedProgram } = state.programs;
    const program = getObject(programs, selectedProgram, {});

    if (program.survey_on === 'student' || program.survey_on === 'studentgroup') {
      selectedInstitutions.forEach((id) => {
        dispatch(fetchStudentGroupOfMA({ id }));
      });
    }

    dispatch({
      type: SELECT_ASSESSMENT_TYPE_OF_MA,
      value,
    });
  };
};

export const fetchBoundariesOfMA = (entity) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(fetchBoundary(entity));
  };
};

export const selectClusterOfMA = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedClusters } = state.mapAssessments;
    if (selectedClusters.includes(entity.uniqueId)) {
      dispatch({
        type: SELECT_CLUSTER_OF_MA,
        value: pull(selectedClusters, entity.uniqueId),
      });
      dispatch({
        type: SET_INSTITUTIONS_OF_MA,
        value: { [entity.id]: [] },
      });
    } else {
      dispatch(fetchInstitutionOfMA(entity));
      dispatch({
        type: SELECT_CLUSTER_OF_MA,
        value: [...selectedClusters, entity.uniqueId],
      });
    }
  };
};

export const selectInstitutionOfMA = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedInstitutions } = state.mapAssessments;
    const { programs, selectedProgram } = state.programs;
    const program = getObject(programs, selectedProgram, {});

    if (selectedInstitutions.includes(entity.id)) {
      dispatch({
        type: SELECT_INSTITUTION_OF_MA,
        value: pull(selectedInstitutions, entity.id),
      });
      dispatch({
        type: SET_STUDENTGROUPS_OF_MA,
        value: { [entity.id]: [] },
      });
    } else {
      if (program.survey_on === 'student' || program.survey_on === 'studentgroup') {
        dispatch(fetchStudentGroupOfMA(entity));
      }

      dispatch({
        type: SELECT_INSTITUTION_OF_MA,
        value: [...selectedInstitutions, entity.id],
      });
    }
  };
};

export const selectClassOfMa = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedClasses } = state.mapAssessments;
    if (selectedClasses.includes(entity.id)) {
      dispatch({
        type: SELECT_CLASS_OF_MA,
        value: pull(selectedClasses, entity.id),
      });
    } else {
      dispatch({
        type: SELECT_CLASS_OF_MA,
        value: [...selectedClasses, entity.id],
      });
    }
  };
};

export const selectAssessmentOfMA = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedAssessments } = state.mapAssessments;
    if (selectedAssessments.includes(value)) {
      dispatch({
        type: SELECT_ASSESSMENT_OF_MA,
        value: pull(selectedAssessments, value),
      });
    } else {
      dispatch({
        type: SELECT_ASSESSMENT_OF_MA,
        value: [...selectedAssessments, value],
      });
    }
  };
};

export const openBoundaryOfMa = (id, depth) => {
  return (dispatch) => {
    dispatch(resetMappingError());
    if (depth === 1) {
      dispatch({
        type: SET_INSTITUTIONS_INDEX_OF_MA,
        index: null,
        id,
      });
      dispatch({
        type: SELECT_CLASS_OF_MA,
        value: [],
      });
      dispatch({
        type: SET_CLUSTERS_INDEX_OF_MA,
        index: depth + 1,
        id,
      });
    }

    if (depth === 2) {
      dispatch({
        type: SET_CLUSTERS_INDEX_OF_MA,
        index: null,
        id,
      });

      dispatch({
        type: SET_INSTITUTIONS_INDEX_OF_MA,
        index: depth + 1,
        id,
      });
    }
  };
};

export const mapAssessmentsToInsitutions = (surveyId, assessments, institutions, boundaryIds) => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}surveys/${surveyId}/questiongroup/map-institution/`;

    post(url, {
      questiongroup_ids: assessments,
      institution_ids: institutions,
      boundary_ids: boundaryIds,
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(Notifications.success(mapAssessmentsDone));
          dispatch({
            type: RESET_MAP_ASSESSMENTS,
          });
          dispatch(resetMappingError());
        } else {
          dispatch(showMappingError(response.data));
        }
        dispatch(toggleSubmitLoading());
      })
      .catch(() => {
        dispatch(Notifications.error(mapAssessmentsFailed));
      });
  };
};

export const mapAssessmentsToStudentgroups = (
  surveyId,
  institutions,
  studentgroups,
  assessments,
) => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}surveys/${surveyId}/questiongroup/map-studentgroup/`;
    post(url, {
      questiongroup_ids: assessments,
      studentgroup_ids: studentgroups,
      boundary_ids: institutions,
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(Notifications.success(mapAssessmentsDone));
          dispatch({
            type: RESET_MAP_ASSESSMENTS,
          });
          dispatch(resetMappingError());
        } else {
          dispatch(showMappingError(response.data));
        }
        dispatch(toggleSubmitLoading(false));
      })
      .catch(() => {
        dispatch(Notifications.error(mapAssessmentsFailed));
      });
  };
};

export const mapBoundariesToAssessments = () => {
  return (dispatch, getState) => {
    dispatch(toggleSubmitLoading(true));
    const state = getState();
    const { selectedProgram, programs } = state.programs;
    const {
      selectedInstitutions,
      selectedAssessments,
      selectedClasses,
      selectedEntityId,
      selectedClusters,
    } = state.mapAssessments;
    const { boundaryDetails } = state.boundaries;
    const program = getObject(programs, selectedProgram, {});

    let boundaryIds = [];
    let institutionIds = [];
    if (!selectedInstitutions.length) {
      if (selectedClusters.length) {
        boundaryIds = selectedClusters.map((id) => {
          return boundaryDetails[id].id;
        });
      } else {
        boundaryIds = [boundaryDetails[selectedEntityId].id];
      }
    }

    if (!selectedClasses.length) {
      institutionIds = selectedInstitutions;
    }

    if (program.survey_on === 'institution') {
      dispatch(mapAssessmentsToInsitutions(
        selectedProgram,
        selectedAssessments,
        selectedInstitutions,
        boundaryIds,
      ));
    } else {
      dispatch(mapAssessmentsToStudentgroups(
        selectedProgram,
        institutionIds,
        selectedClasses,
        selectedAssessments,
      ));
    }
  };
};
