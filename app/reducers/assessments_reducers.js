
function processAssessments(data)
{
  var newAssessmentsById = {};
  if(data.length > 0)
  {
    data.map(assessment => {
     
      newAssessmentsById[assessment.id] = assessment;
      var questionsRouterUrl = "programs/" + assessment.programme +"/assessments/" + assessment.id + "/questions";
      newAssessmentsById[assessment.id].questionsUrl = questionsRouterUrl;
    })
  }

  return newAssessmentsById;
  
}

function processQuestions(data)
{
  var newQuestionsById = {};
  if(data.length > 0)
  {
    data.map(question => {
        newQuestionsById[question.id] = question;
    });
  }
  return newQuestionsById;
}

export function assessments(state = {
  assessmentsById: {}, questionsById: {}
}, action){
  try
  {
    switch(action.type)
    {

      case 'QUESTIONS_RESPONSE_RECEIVED':
          const questions = processQuestions(action.data);
          return Object.assign(
            {},
            state,
            {questionsById: questions}
            );

      case 'QUESTION_CREATED':
          var copy = Object.assign({}, state.questionsById);
          copy[action.question.id] = action.question;
          return Object.assign({}, {questionsById: copy});

      case 'QUESTION_DELETED':
          return Object.assign({}, {questionsById: _.omit(state.questionsById, action.questionId)});

      case 'ASSESSMENTS_RESPONSE_RECEIVED':
          const assessmentsByProgram = processAssessments(action.data);
          return Object.assign(
            {},
            state,
            {assessmentsById: assessmentsByProgram}
            );

      case 'ASSESSMENT_DELETED':
        var copyState = _.omit(state.assessmentsById,action.id);
        return Object.assign({}, {assessmentsById: copyState});

      case 'ASSESSMENT_EDITED':
        var copy = Object.assign({}, state.assessmentsById);
        copy[action.assessment.id].name = action.assessment.name;
        copy[action.assessment.id].start_date=action.assessment.start_date;
        copy[action.assessment.id].end_date=action.assessment.end_date;
        copy[action.assessment.id].active=action.assessment.active;
        copy[action.assessment.id].double_entry=action.assessment.double_entry;
        copy[action.assessment.id].type=action.assessment.type;

        return Object.assign({}, {assessmentsById: copy});

      case 'ASSESSMENT_CREATED':
            var copy = Object.assign({}, state.assessmentsById);
            copy[action.assessment.id] = action.assessment;
            return Object.assign({}, {assessmentsById: copy});

      default:
      return state;
    }
  }
  catch(exception)
  {
    console.log(exception);
    console.log(state);
  }
}