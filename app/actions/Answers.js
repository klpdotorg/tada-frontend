import { SERVER_API_BASE } from 'config';
import { post } from './requests';

export const createAnswergroup = (url, body) => {
  return post(url, body);
};

export const saveAnswer = (Id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { answers, selectedProgramAssess } = state.assessmentEntry;
    const { selectedProgram } = state.programs;
    const { assessmentId, boundaryId } = selectedProgramAssess;

    console.log(selectedProgram, assessmentId, 'printing this information', Id);

    const url = `${SERVER_API_BASE}surveys/${selectedProgram}/questiongroups/${assessmentId}/answergroups/`;
    return createAnswergroup(url, { institution: boundaryId, status: 'AC' }).then((res) => {
      console.log(res);
    });
  };
};
