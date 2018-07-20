import { SERVER_API_BASE, DEFAULT_PARENT_ID } from 'config';
import { push } from 'react-router-redux';

import getObject from 'lodash.get';

import { get } from './requests';
import {
  COLLAPSED_PROGRAM_ENTITY,
  UNCOLLAPSED_PROGRAM_ENTITY,
  SET_FITLER_PROGRAM_ENTITIES,
  REMOVE_EXISTING_NODE,
  RESET_PROGRAM_NAV_TREE,
  SELECT_PROGRAM_ENTITY,
  SELECT_ASSESSMENT_NODE,
} from './types';
import { convertEntitiesToObject, getPath } from '../utils';
import {
  showBoundaryLoading,
  closeBoundaryLoading,
  fetchAllPrograms,
  setPrograms,
  resetAnswerError,
} from './index';

const checkFilterByProgramUrl = (path, surveyOn) => {
  if (surveyOn === 'student') {
    return path.replace('studentgroup', 'students');
  }

  return path;
};

const handleMappingResult = (results) => {
  return results.reduce((soFar, value) => {
    const result = soFar;
    let item = result[value.id];
    if (!item) {
      item = {
        id: value.id,
        'assessment-type': value['assessment-type'],
        name: value.name,
        assessments: [value.assessment],
      };
    } else {
      item.assessments = [...item.assessments, value.assessment];
    }

    result[item.id] = item;

    return result;
  }, {});
};

export const selectProgramEntity = (value) => {
  return {
    type: SELECT_PROGRAM_ENTITY,
    value,
  };
};

export const openFilterByProgramEntity = (uniqueId, depth, assessmentId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgram } = state.programs;
    const survey = getObject(state.programs.programs, selectedProgram, {});
    const boundaryPath = getPath(state, uniqueId, depth, 'program');

    const path = `/filterprograms/${selectedProgram}/questiongroup/${assessmentId}${boundaryPath}`;
    const url = checkFilterByProgramUrl(path, survey.survey_on);

    dispatch(selectProgramEntity(`${assessmentId}${uniqueId}`));
    dispatch(resetAnswerError());
    dispatch(push(url));
  };
};

export const collapsedProgramEntity = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    const { uncollapsedEntities } = state.programDetails;
    if (uncollapsedEntities.includes(value)) {
      dispatch({
        type: COLLAPSED_PROGRAM_ENTITY,
        value,
      });
    } else {
      dispatch({
        type: UNCOLLAPSED_PROGRAM_ENTITY,
        value,
      });
    }
  };
};

const getUrlForFilterProgram = (entity, surveyId, surveyOn) => {
  const admin1 = `${SERVER_API_BASE}survey/${surveyId}/boundary-associations/?boundary_id=${DEFAULT_PARENT_ID}&boundary_type=admin1`;
  const admin2 = `${SERVER_API_BASE}survey/${surveyId}/boundary-associations/?boundary_id=${entity.id}&boundary_type=admin2`;
  const admin3 = `${SERVER_API_BASE}survey/${surveyId}/boundary-associations/?boundary_id=${entity.id}&boundary_type=admin3`;
  const institutions = `${SERVER_API_BASE}survey/${surveyId}/institution-associations/?boundary_id=${entity.id}`;
  const institutionMapping = `${SERVER_API_BASE}surveys/${surveyId}/questiongroup/mappings/?boundary_id=${entity.id}`;
  const studentgroupMapping = `${SERVER_API_BASE}surveys/${surveyId}/questiongroup/mappings/?institution_id=${entity.id}`;

  if (surveyOn === 'institution') {
    switch (entity.depth) {
      case 0:
        return admin1;
      case 1:
        return admin2;
      case 2:
        return admin3;
      case 3:
        return institutionMapping;
      default:
        return null;
    }
  }

  if (surveyOn === 'studentgroup') {
    switch (entity.depth) {
      case 0:
        return admin1;
      case 1:
        return admin2;
      case 2:
        return admin3;
      case 3:
        return institutions;
      case 4:
        return studentgroupMapping;
      default:
        return null;
    }
  }

  switch (entity.depth) {
    case 0:
      return admin1;
    case 1:
      return admin2;
    case 2:
      return admin3;
    case 3:
      return institutions;
    case 4:
      return studentgroupMapping;
    default:
      return null;
  }
};

export const fetchProgramEntities = (Ids) => {
  return (dispatch, getState) => {
    const state = getState();
    const entity = Ids[0];
    const entities = Ids.slice(1);
    const { uncollapsedEntities } = state.programDetails;
    const currentNode = getObject(uncollapsedEntities, entity.depth);
    const existing = currentNode === entity.uniqueId;

    if (!existing && entity.depth <= 5) {
      dispatch(fetchAdmins(entity, entities));
    } else {
      dispatch(closeBoundaryLoading());
    }

    if (entity.depth > 0) {
      const depths = Object.keys(uncollapsedEntities).filter((depth) => {
        return !(depth >= entity.depth);
      });

      if (!existing) {
        depths.push(entity.depth);
      }

      const newUnCollapsedEntities = depths.reduce((soFar, depth) => {
        const value = uncollapsedEntities[depth];

        if (!value || depth === entity.depth) {
          soFar[depth] = entity.uniqueId;
        } else {
          soFar[depth] = value;
        }

        return soFar;
      }, {});

      dispatch({
        type: UNCOLLAPSED_PROGRAM_ENTITY,
        value: newUnCollapsedEntities,
      });
      dispatch({
        type: REMOVE_EXISTING_NODE,
        value: entity.depth,
      });
    } else {
      dispatch({
        type: UNCOLLAPSED_PROGRAM_ENTITY,
        value: {},
      });
    }
  };
};

const fetchAdmins = (entity, moreEntities) => {
  return (dispatch, getState) => {
    if (entity.depth === 0) {
      dispatch({
        type: RESET_PROGRAM_NAV_TREE,
      });
    }

    const state = getState();
    const { selectedProgram, programs } = state.programs;
    const boundary = getObject(state.programDetails, ['programDetails', entity.uniqueId], {});
    const programInfo = getObject(programs, selectedProgram);
    const url = getUrlForFilterProgram(
      { ...entity, id: boundary.id },
      selectedProgram,
      programInfo.survey_on,
    );

    get(url).then(({ data }) => {
      let entities = {};
      if (url.includes('mapping')) {
        entities = handleMappingResult(data.results);
      } else {
        entities = convertEntitiesToObject(data.results);
      }

      dispatch({
        type: SET_FITLER_PROGRAM_ENTITIES,
        programDetails: entities,
        entitiesByParentId: { [entity.depth]: Object.keys(entities) },
      });

      if (moreEntities && moreEntities.length) {
        dispatch(fetchProgramEntities(moreEntities));
      } else {
        dispatch(closeBoundaryLoading());
      }
    });
  };
};

export const getProgramEntities = (Ids) => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;
    dispatch(showBoundaryLoading());
    const { selectedProgram } = state.programs;
    if (!selectedProgram) {
      fetchAllPrograms(state_code).then((results) => {
        dispatch(setPrograms(results));
        dispatch(fetchProgramEntities(Ids));
      });
    } else {
      dispatch(fetchProgramEntities(Ids));
    }
  };
};

export const selectAssessmentNode = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    const { assessmentNode } = state.programDetails;
    if (assessmentNode === value) {
      dispatch({
        type: SELECT_ASSESSMENT_NODE,
        value: '',
      });
    } else {
      dispatch({
        type: SELECT_ASSESSMENT_NODE,
        value,
      });
    }
  };
};
