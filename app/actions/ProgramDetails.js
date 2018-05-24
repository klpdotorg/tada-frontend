import { SERVER_API_BASE, DEFAULT_PARENT_ID } from 'config';
import getObject from 'lodash.get';

import { get } from './requests';
import {
  COLLAPSED_PROGRAM_ENTITY,
  UNCOLLAPSED_PROGRAM_ENTITY,
  SET_FITLER_PROGRAM_ENTITIES,
  REMOVE_EXISTING_NODE,
} from './types';
import { convertEntitiesToObject, getPath } from '../utils';
import { showBoundaryLoading, closeBoundaryLoading } from './index';

export const openFilterByProgramEntity = (uniqueId, depth) => {
  return (dispatch, getState) => {
    const state = getState();

    console.log(uniqueId, depth);

    const path = getPath(state, uniqueId, depth, 'program');
    console.log(path, 'printing the path of programEntity');
    // dispatch(push(path));
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

const fetchAdmins = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgram, programs } = state.programs;
    const programInfo = getObject(programs, selectedProgram);
    const url = getUrlForFilterProgram(entity, selectedProgram, programInfo.survey_on);

    get(url).then((res) => {
      const entities = convertEntitiesToObject(res.results);

      dispatch({
        type: SET_FITLER_PROGRAM_ENTITIES,
        programDetails: entities,
        entitiesByParentId: { [entity.depth]: Object.keys(entities) },
      });
      dispatch(closeBoundaryLoading());
    });
  };
};

export const getFilterByProgramEntites = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(showBoundaryLoading());
    const { selectedProgram } = state.programs;
    const { uncollapsedEntities } = state.programDetails;
    const currentNode = getObject(uncollapsedEntities, entity.depth);
    const existing = currentNode === entity.uniqueId;
    if (!existing && entity.depth <= 5) {
      dispatch(fetchAdmins(entity, selectedProgram));
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
    }
  };
};
