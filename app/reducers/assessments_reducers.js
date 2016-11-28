
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