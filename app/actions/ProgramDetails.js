import { SERVER_API_BASE } from 'config';

import { get } from './requests';
import {
  COLLAPSED_PROGRAM_ENTITY,
  UNCOLLAPSED_PROGRAM_ENTITY,
  SET_FITLER_PROGRAM_ENTITIES,
  REMOVE_EXISTING_NODE,
} from './types';
import { convertEntitiesToObject } from '../utils';

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

const getUrlForFilterProgram = (entity, surveyId) => {
  switch (entity.depth) {
    case 0:
      return `${SERVER_API_BASE}boundary/admin1s/?survey_id=${surveyId}`;
    case 1:
      return `${SERVER_API_BASE}boundary/admin1/${entity.id}/admin2/?survey_id=${surveyId}`;
    case 2:
      return `${SERVER_API_BASE}boundary/admin2/${entity.id}/admin3/?survey_id=${surveyId}`;
    case 3:
      return `${SERVER_API_BASE}institutions/?admin3=${entity.id}&survey_id=${surveyId}`;
    case 4:
      return `${SERVER_API_BASE}survey/institution/detail/?survey_id=${surveyId}&institution_id=${entity.id}`;
    default:
      return null;
  }
};

const fetchAdmins = (entity) => {
  return (dispatch) => {
    const url = getUrlForFilterProgram(entity, 1);

    get(url).then((res) => {
      const entities = convertEntitiesToObject(res.results);

      dispatch({
        type: SET_FITLER_PROGRAM_ENTITIES,
        programDetails: entities,
        entitiesByParentId: { [entity.depth]: Object.keys(entities) },
      });
    });
  };
};

export const getFilterByProgramEntites = (entity) => {
  return (dispatch, getState) => {
    const state = getState();
    const selectedProgramId = 1;

    if (entity.depth <= 5) {
      dispatch(fetchAdmins(entity, selectedProgramId));
    }

    if (entity.depth > 0) {
      const { uncollapsedEntities } = state.programDetails;
      const depths = Object.keys(uncollapsedEntities).filter((depth) => {
        return !(depth >= entity.depth);
      });

      depths.push(entity.depth);

      const newUnCollapsedEntities = depths.reduce((soFar, depth) => {
        const value = uncollapsedEntities[depth];

        if (!value || depth === entity.depth) {
          soFar[depth] = entity.id;
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