
function processAssessments(data)
{
  var newAssessmentsById = {};
  if(data.length > 0)
  {
    data.map(assessment => {
     
      newAssessmentsById[assessment.id] = assessment;
    })
  }

  return newAssessmentsById;
  
}

export function assessments(state = {
  assessmentsById: {}, 
}, action){
  try
  {
    switch(action.type)
    {
      case 'ASSESSMENTS_RESPONSE_RECEIVED':
      console.log("State before change", state);

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