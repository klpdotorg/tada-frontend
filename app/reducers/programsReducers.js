export function programs(state = {
  programsById: []
}, action){

  switch(action.type) {
    case 'PROGRAMS_RESPONSE_RECEIVED':
    const programs = processProgramDetails(action.data, state.programsById);
    return {
      ...state,
      ...programs
    }
    default:
    return state;

  }
}

function processProgramDetails(programsData, programsById)
{

  var newProgramsById = {};
  if(programsData.length > 0 )
  {
    programsData.map(program => {
      newProgramsById[program.id] = program;
    })
  } 
  //Merge existing program details with new info from server. This will eliminate dupes.
  var mergedProgramDetails = {}
  Object.assign(mergedProgramDetails, programsById, newProgramsById);
  return {
    programsById: mergedProgramDetails
  };
}



