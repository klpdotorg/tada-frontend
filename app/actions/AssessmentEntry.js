import { map } from 'lodash';
import { SERVER_API_BASE } from 'config';

import { get } from './requests';
import { fetchStudents, fetchAllPrograms, fetchQuestions, setQuestions } from './index';

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

export const fetchAnswers = () => {
  get();
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
