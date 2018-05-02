import { SERVER_API_BASE } from 'config';
import _ from 'lodash';

import { get } from './requests';
import {
  COLLAPSED_PROGRAM_ENTITY,
  UNCOLLAPSED_PROGRAM_ENTITY,
  SET_FITLER_PROGRAM_ENTITIES,
  REMOVE_EXISTING_NODE,
} from './types';
import { convertEntitiesToObject } from '../utils';
import { showBoundaryLoading, closeBoundaryLoading } from './index';

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
  if (entity.depth <= 2) {
    switch (entity.depth) {
      case 0:
        return `${SERVER_API_BASE}boundary/admin1s/?survey_id=${surveyId}`;
      case 1:
        return `${SERVER_API_BASE}boundary/admin1/${entity.id}/admin2/?survey_id=${surveyId}`;
      case 2:
        return `${SERVER_API_BASE}boundary/admin2/${entity.id}/admin3/?survey_id=${surveyId}`;
      default:
        return null;
    }
  }

  switch (surveyOn) {
    case 'institution':
      return `${SERVER_API_BASE}surveys/${surveyId}/questiongroups/mappings/?boundary_id=${entity.id}`;
    case 'studentgroup':
      return `${SERVER_API_BASE}survey/questiongroupmap/?survey_id=${surveyId}&institution_id=${entity.id}`;
    case 'student':
      return `${SERVER_API_BASE}survey/questiongroupmap/?survey_id=${surveyId}&institution_id=${entity.id}`;
    default:
      return null;
  }
};

const fetchAdmins = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgram, programs } = state.programs;
    const programInfo = _.get(programs, selectedProgram);
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
    const currentNode = _.get(uncollapsedEntities, entity.depth);
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
