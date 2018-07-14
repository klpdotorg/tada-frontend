import {
  CHANGE_ANSWER_PAGINATION_CURRENT,
  GO_ANSWER_PAGINATION_BACK,
  GO_ANSWER_PAGINATION_NEXT,
} from './types';
import { fetchAnswerGroups, fetchStudentsForAssessmentEntry } from './index';

export const studentPaginationChange = (value, id) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ANSWER_PAGINATION_CURRENT,
      value,
    });
    dispatch(fetchStudentsForAssessmentEntry(id));
  };
};

export const studentPaginationNext = (value, id) => {
  return (dispatch) => {
    dispatch({
      type: GO_ANSWER_PAGINATION_NEXT,
      value,
    });
    dispatch(fetchStudentsForAssessmentEntry(id));
  };
};

export const studentPaginationBack = (value, id) => {
  return (dispatch) => {
    dispatch({
      type: GO_ANSWER_PAGINATION_BACK,
      value,
    });
    dispatch(fetchStudentsForAssessmentEntry(id));
  };
};

export const answerPaginationChange = (value, params) => {
  return (dispatch) => {
    const { assessmentId, boundaryId, boundaryType } = params;
    dispatch({
      type: CHANGE_ANSWER_PAGINATION_CURRENT,
      value,
    });
    dispatch(fetchAnswerGroups(assessmentId, boundaryType, boundaryId));
  };
};

export const answerPaginationNext = (params) => {
  return (dispatch) => {
    const { assessmentId, boundaryId, boundaryType } = params;
    dispatch({
      type: GO_ANSWER_PAGINATION_NEXT,
    });
    dispatch(fetchAnswerGroups(assessmentId, boundaryType, boundaryId));
  };
};

export const answerPaginationBack = (params) => {
  return (dispatch) => {
    const { assessmentId, boundaryId, boundaryType } = params;
    dispatch({
      type: GO_ANSWER_PAGINATION_BACK,
    });
    dispatch(fetchAnswerGroups(assessmentId, boundaryType, boundaryId));
  };
};
