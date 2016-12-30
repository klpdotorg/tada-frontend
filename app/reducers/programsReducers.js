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
    case 'PROGRAM_DELETED':     
      var copyState = _.omit(state.programsById,action.programId);
      console.log("new state", copyState);
      return Object.assign({}, {programsById: copyState});
    case 'PROGRAM_EDITED':
      var copy = Object.assign({}, state.programsById);
      copy[action.program.id].name = action.program.name;
      copy[action.program.id].description = action.program.description;
      copy[action.program.id].start_date=action.program.start_date;
      copy[action.program.id].end_date=action.program.end_date;
      copy[action.program.id].active=action.program.active;
      copy[action.program.id].programme_institution_category=action.program.programme_institution_category;
      return Object.assign({}, {programsById: copy});
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



