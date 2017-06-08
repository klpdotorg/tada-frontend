import { checkStatus as checkRespStatus } from './actions';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase, SERVER_AUTH_BASE as authApiBase } from 'config';
import { urls as URLs } from '../constants';

export const postAnswerForStudent = (programId, assessmentId, studentId, answersObj) => (
  dispatch,
  getState,
) => {
  var url =
    serverApiBase +
    `programmes/${programId}/assessments/${assessmentId}/students/${studentId}/answers/`;
  //Answers is just an array of question ids and answers..
  let answersjson = [];
  Object.keys(answersObj).map(qnId => {
    if (answersObj[qnId] != null && answersObj[qnId].value != null) {
      answersjson.push({
        question: qnId,
        student: studentId,
        active: '2',
        answer: answersObj[qnId].value,
      });
    }
  });
  //Figure out whether its a PATCH or a POST. PATCH is if double_entry=1 and this is verification. POST is if double_entry is 0.
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(answersjson),
  })
    .then(checkStatus)
    .then(data => {
      console.log(data);
    });
};

export const fetchAnswersForStudentQuestion = (programId, assessmentId, studentId) => (
  dispatch,
  getState,
) => {
  var url =
    serverApiBase +
    `programmes/${programId}/assessments/${assessmentId}/students/${studentId}/answers/`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
  })
    .then(checkStatus)
    .then(data => {
      console.log(data);
      dispatch({
        type: 'ANSWERS_RECEIVED',
        studentId,
        assessmentId,
      });
    });
};

export const getAnswersForStudents = (programId, assessmentId, studentsData) => (
  dispatch,
  getState,
) => {
  let studentsArray = studentsData.results;
  studentsArray.map(student => {
    let id = student.id;
    var url =
      serverApiBase + `programmes/${programId}/assessments/${assessmentId}/students/${id}/answers/`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        console.log('Student answer data is: ', data);
        dispatch({
          type: 'ANSWERS_RECEIVED',
          id,
          assessmentId,
          data,
        });
      });
  });
};

export const getAssessmentsForBoundary = boundaryid => {
  return function(dispatch, getState) {
    dispatch({
      type: 'FETCHING_ASSESSMENTS_PER_BOUNDARY',
      boundary: boundaryid,
    });
    var url = URLs.ASSESSMENTS + '?boundary=' + boundaryid;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch({
          type: 'FETCHED_ASSESSMENTS_PER_BOUNDARY',
          boundary: boundaryid,
          results: data.results,
        });
      });
  };
};
/** QUESTIONS RELATED ACTIONS BEGIN */

export function fetchQuestionsForAssessment(programId, assessmentId) {
  return function(dispatch, getState) {
    var url =
      serverApiBase + 'programmes/' + programId + '/assessments/' + assessmentId + '/questions/';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch(handleQuestionsResponse(data));
      })
      .catch(error => {
        console.log(error);
        //dispatch(requestFailed(error));
      });
  };
}

export function deleteQuestion(programId, assessmentId, questionId) {
  return function(dispatch, getState) {
    var url =
      serverApiBase +
      'programmes/' +
      programId +
      '/assessments/' +
      assessmentId +
      '/questions/' +
      questionId +
      '/';
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status === 401) {
          dispatch(push('/login'));
          return;
        }
        const error = new Error(response.statusText);
        error.response = response.json();
        throw error;
      })
      .then(dispatch(questionDeleted(questionId)))
      .catch(error => {
        console.log(error); //dispatch(requestFailed(error));
      });
  };
}

export function editQuestion(programId, assessmentId, questionId) {}

export function createQuestion(
  programId,
  assessmentId,
  qnNumber,
  qnOrder,
  qnText,
  type,
  grade,
  minScore,
  maxScore,
  active,
) {
  return function(dispatch, getState) {
    var url =
      serverApiBase + 'programmes/' + programId + '/assessments/' + assessmentId + '/questions/';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify({
        name: qnNumber,
        order: qnOrder,
        question_type: type,
        score_min: minScore,
        score_max: maxScore,
        grade: grade,
        active: 2,
        assessment: assessmentId,
      }),
    })
      .then(checkStatus)
      .then(data => {
        dispatch(createQuestionSuccessful(data));
      });
  };
}

function createQuestionSuccessful(response) {
  return {
    type: 'QUESTION_CREATED',
    question: response,
  };
}

function questionDeleted(id) {
  return {
    type: 'QUESTION_DELETED',
    questionId: id,
  };
}
function handleQuestionsResponse(resp) {
  return {
    type: 'QUESTIONS_RESPONSE_RECEIVED',
    data: resp.results,
  };
}

/** ASSESSMENT ACTIONS BEGIN */
export function fetchAssessmentsForProgram(programId) {
  return function(dispatch, getState) {
    dispatch(fetchingAssessments());
    var url = serverApiBase + 'programmes/' + programId + '/assessments/?active=2';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(checkStatus)
      .then(data => {
        dispatch(handleAssessmentsResponse(data));
      })
      .catch(error => {
        console.log(error);
        //dispatch(requestFailed(error));
      });
  };
}

export function createAssessment(
  programId,
  assessmentName,
  startDate,
  endDate,
  isActive,
  doubleEntry,
  type,
) {
  return function(dispatch, getState) {
    var url = serverApiBase + 'programmes/' + programId + '/assessments/';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify({
        programme: programId,
        name: assessmentName,
        start_date: startDate,
        end_date: endDate,
        active: isActive,
        double_entry: doubleEntry,
        type: type,
      }),
    })
      .then(checkStatus)
      .then(data => {
        dispatch(createAssessmentSuccessful(data));
      });
  };
}

export function editAssessment(
  programId,
  assessmentId,
  assessmentName,
  startDate,
  endDate,
  isActive,
  doubleEntry,
  type,
) {
  return function(dispatch, getState) {
    var url = serverApiBase + 'programmes/' + programId + '/assessments/' + assessmentId + '/';
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify({
        name: assessmentName,
        start_date: startDate,
        end_date: endDate,
        active: isActive,
        double_entry: doubleEntry,
        type: type,
      }),
    })
      .then(checkStatus)
      .then(data => {
        dispatch(editAssessmentSuccessful(data));
      });
  };
}

export function activateAssessment(parentProgrammeId, assessmentId) {
  return function(dispatch, getState) {
    var url =
      serverApiBase + 'programmes/' + parentProgrammeId + '/assessments/' + assessmentId + '/';
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify({
        active: 1,
      }),
    })
      .then(checkStatus)
      .then(response => {
        dispatch(editAssessmentSuccessful(response));
        return response;
      });
  };
}

export function deactivateAssessment(parentProgrammeId, assessmentId) {
  return function(dispatch, getState) {
    var url =
      serverApiBase + 'programmes/' + parentProgrammeId + '/assessments/' + assessmentId + '/';
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify({
        active: 0,
      }),
    })
      .then(checkStatus)
      .then(response => {
        dispatch(deleteAssessmentSuccessful(response.id));
        return response;
      });
  };
}

export function deleteAssessment(parent_programmeid, assessmentId) {
  return function(dispatch, getState) {
    var url =
      serverApiBase + 'programmes/' + parent_programmeid + '/assessments/' + assessmentId + '/';
    return fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else if (response.status === 401) {
          dispatch(push('/login'));
          return;
        }
        const error = new Error(response.statusText);
        error.response = response.json();
        throw error;
      })
      .then(response => {
        dispatch(deleteAssessmentSuccessful(assessmentId));
        return response;
      });
  };
}

function handleAssessmentsResponse(resp) {
  return {
    type: 'ASSESSMENTS_RESPONSE_RECEIVED',
    data: resp.results,
  };
}

function fetchingAssessments() {
  return {
    type: 'FETCHING_ASSESSMENTS',
  };
}

function createAssessmentSuccessful(item) {
  return {
    type: 'ASSESSMENT_CREATED',
    assessment: item,
  };
}

function deleteAssessmentSuccessful(id) {
  return {
    type: 'ASSESSMENT_DELETED',
    id: id,
  };
}

function editAssessmentSuccessful(data) {
  return {
    type: 'ASSESSMENT_EDITED',
    assessment: data,
  };
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    dispatch(push('/login'));
    return;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
