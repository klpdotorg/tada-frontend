function processAssessments(data) {
  var newAssessmentsById = {};
  if (data.length > 0) {
    data.map(assessment => {
      newAssessmentsById[assessment.id] = assessment;
      var questionsRouterUrl =
        'programs/' + assessment.programme + '/assessments/' + assessment.id + '/questions';
      newAssessmentsById[assessment.id].questionsUrl = questionsRouterUrl;
    });
  }

  return newAssessmentsById;
}

function processQuestions(data) {
  var newQuestionsById = {};
  var questionsByAssessId = {};
  var questionIds = [];
  let assessid = '';
  if (data.length > 0) {
    data.map(question => {
      newQuestionsById[question.id] = question;
      assessid = question.assessment;

      questionIds.push(question.id);
    });
  }
  questionsByAssessId[assessid] = questionIds;
  return {
    questionsById: newQuestionsById,
    questionsByAssessId: questionsByAssessId,
  };
}

export const processAssessmentsByBoundary = (boundaryid, assessments) => {
  var perBoundary = {};
  var boundArray = [];
  assessments.map(assessment => {
    boundArray.push(assessment.id);
  });
  perBoundary[boundaryid] = boundArray;
  return perBoundary;
};

export const processAnswersPerStudent = (studentid, assessmentid, answersArray) => {
  let answersByUniqueId = {};
  if (answersArray && answersArray.length > 0) {
    answersArray.map(answer => {
      var answer_id = studentid + '_' + answer.question;
      answersByUniqueId[answer_id] = answer;
    });
  }
  return answersByUniqueId;
};

export function assessments(
  state = {
    assessmentsById: {},
    questionsById: {},
    isFetching: {},
    questionsByAssessId: {},
    assessmentsByBoundary: {},
    answersById: {},
  },
  action,
) {
  try {
    switch (action.type) {
      case 'FETCHING_ASSESSMENTS_PER_BOUNDARY':
        return {
          ...state,
          isFetching: _.merge(state.isFetching, { [action.boundary]: true }),
        };
      case 'FETCHED_ASSESSMENTS_PER_BOUNDARY':
        const assessments = processAssessments(action.results);
        const mergedAssess = Object.assign({}, state.assessmentsById, assessments);
        const mergedBoundAssess = Object.assign(
          {},
          state.assessmentsByBoundary,
          processAssessmentsByBoundary(action.boundary, action.results),
        );
        return {
          ...state,
          assessmentsById: mergedAssess,
          assessmentsByBoundary: mergedBoundAssess,
        };
      case 'QUESTIONS_RESPONSE_RECEIVED':
        const questions = processQuestions(action.data);

        return Object.assign({}, state, questions);

      case 'QUESTION_CREATED':
        var copy = Object.assign({}, state.questionsById);
        copy[action.question.id] = action.question;
        return Object.assign({}, { questionsById: copy });

      case 'QUESTION_DELETED':
        return Object.assign({}, { questionsById: _.omit(state.questionsById, action.questionId) });

      case 'ASSESSMENTS_RESPONSE_RECEIVED':
        const assessmentsByProgram = processAssessments(action.data);

        return Object.assign({}, state, {
          assessmentsById: assessmentsByProgram,
          isFetching: false,
        });

      case 'ASSESSMENT_DELETED':
        var copyState = _.omit(state.assessmentsById, action.id);
        return Object.assign({}, { assessmentsById: copyState });

      case 'ASSESSMENT_EDITED':
        var copy = Object.assign({}, state.assessmentsById);
        copy[action.assessment.id].name = action.assessment.name;
        copy[action.assessment.id].start_date = action.assessment.start_date;
        copy[action.assessment.id].end_date = action.assessment.end_date;
        copy[action.assessment.id].active = action.assessment.active;
        copy[action.assessment.id].double_entry = action.assessment.double_entry;
        copy[action.assessment.id].type = action.assessment.type;

        return Object.assign({}, { assessmentsById: copy });

      case 'ASSESSMENT_CREATED':
        var copy = Object.assign({}, state.assessmentsById);
        copy[action.assessment.id] = action.assessment;
        return Object.assign({}, { assessmentsById: copy });

      case 'ANSWERS_RECEIVED':
        var copy = Object.assign({}, state.answersById);
        let answers = processAnswersPerStudent(action.id, action.assessmentId, action.data.results);
        let newAnswers = Object.assign({}, state.answersById, answers);

        let result = {
          ...state,
          answersById: newAnswers,
        };
        return result;
      case 'FETCHING_ASSESSMENTS':
        return {
          ...state,
          isFetching: true,
        };

      default:
        return state;
    }
  } catch (exception) {
    console.log(exception);
    console.log(state);
  }
}
