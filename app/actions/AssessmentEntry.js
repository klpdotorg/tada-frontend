import { map } from 'lodash';
import { SERVER_API_BASE } from 'config';

import {
  SELECT_PROGRAM_ASSESSMENT,
  SET_ASSESSMENT_ENTRY_BOUNDARIES,
  SET_BOUNDARIES,
  SET_ASSESSMENT_ENTRY_ANSWERS,
  CHANGE_ASSESSMENT_ENTRY_ANSWERS,
} from './types';
import { get } from './requests';
import { fetchStudents, fetchAllPrograms, fetchQuestions, setQuestions } from './index';
import { getEntityType, convertEntitiesToObject } from '../utils';

export const onChangeAssessmentEntry = (value, id) => {
  return {
    type: CHANGE_ASSESSMENT_ENTRY_ANSWERS,
    id,
    value,
  };
};

export const selectProgramAssessment = (value, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const { uncollapsedEntities, programDetails } = state.programDetails;
    const lastBoundaryDepth = depth;
    const lastBoundaryUniqueId = uncollapsedEntities[lastBoundaryDepth];
    const lastBoundary = programDetails[lastBoundaryUniqueId];
    const type = getEntityType(lastBoundary);

    dispatch({
      type: SELECT_PROGRAM_ASSESSMENT,
      value: {
        assessmentId: value,
        boundaryId: lastBoundary.id,
        boundaryType: type,
      },
    });
  };
};

const getURL = (type, boundaryId) => {
  switch (type) {
    case 'institution':
      return `${SERVER_API_BASE}institutions/${boundaryId}/studentgroups/`;
    case 'class':
      return `${SERVER_API_BASE}studentgroups/${boundaryId}/students/`;
    default:
      return null;
  }
};

export const fetchSelectedAssessmentBoundary = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgramAssess } = state.assessmentEntry;
    const url = getURL(selectedProgramAssess.boundaryType, selectedProgramAssess.boundaryId);

    get(url).then((res) => {
      const entities = convertEntitiesToObject(res.results);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch({
        type: SET_ASSESSMENT_ENTRY_BOUNDARIES,
        value: Object.keys(entities),
      });
    });
  };
};

export const fetchSelectedAssessmentQuestions = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgramAssess } = state.assessmentEntry;
    const { selectedProgram } = state.programs;

    console.log(selectedProgramAssess);

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroup/${selectedProgramAssess.assessmentId}/questions/`;

    get(url).then((response) => {
      dispatch(setQuestions(response.results, selectedProgramAssess.assessmentId));
    });
  };
};

export const fetchStudentsAndPrograms = (entityId, entityType) => {
  return (dispatch) => {
    if (entityType === 'institution') {
      const studentgroupUrl = `${SERVER_API_BASE}institutions/${entityId}/studentgroups/`;
      get(studentgroupUrl).then((response) => {
        map(response.results, (item) => {
          console.log(item.id);
        });
      });
    } else {
      dispatch(fetchStudents(entityId));
      dispatch(fetchAllPrograms());
    }
  };
};

const filterAnswers = (answers) => {
  return answers.reduce((soFar, ans) => {
    const result = soFar;
    result[ans.question] = { value: ans.answer };

    return result;
  }, {});
};

export const fetchAnswers = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedProgramAssess } = state.assessmentEntry;
    const { selectedProgram } = state.programs;
    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/qgroup/${selectedProgramAssess.assessmentId}/institution/${selectedProgramAssess.boundaryId}/answers/`;
    get(url).then((res) => {
      const answers = filterAnswers(res.results);

      dispatch({
        type: SET_ASSESSMENT_ENTRY_ANSWERS,
        value: {
          [selectedProgramAssess.boundaryId]: answers,
        },
      });
    });
  };
};

export const fetchAnswersAndQuestion = (programId) => {
  return (dispatch) => {
    const assessmentId = '';

    fetchQuestions(programId, assessmentId).then((response) => {
      dispatch(setQuestions(response.results, assessmentId));
      fetchAnswers(assessmentId).then((answerResponse) => {
        console.log(answerResponse);
      });
    });
  };
};
