import _ from "lodash";

export function programs(
  state = {
    programsById: [],
    boundaries: {
      boundaries: {},
      assessments: {},
      assessmentsDetails: {}
    }
  },
  action
) {
  switch (action.type) {
    case "PROGRAMS_RESPONSE_RECEIVED":
      const programs = processProgramDetails(action.data, state.programsById);
      return {
        ...state,
        ...programs
      };
    case "PROGRAM_CREATED":
      var copy = Object.assign({}, state.programsById);
      copy[action.program.id] = action.program;
      return Object.assign({}, { programsById: copy });
    case "PROGRAM_DELETED":
      var copyState = _.omit(state.programsById, action.programId);
      return Object.assign({}, { programsById: copyState });
    case "PROGRAM_EDITED":
      var copy = Object.assign({}, state.programsById);
      copy[action.program.id].name = action.program.name;
      copy[action.program.id].description = action.program.description;
      copy[action.program.id].start_date = action.program.start_date;
      copy[action.program.id].end_date = action.program.end_date;
      copy[action.program.id].active = action.program.active;
      copy[action.program.id].programme_institution_category =
        action.program.programme_institution_category;
      return Object.assign({}, { programsById: copy });
    case "PROGRAM_DETAILS":
      const boundaries = serializeProgramBoundaries(action.program);
      return {
        ...state,
        boundaries
      };
    default:
      return state;
  }
}

function sortAssessments(data, key, obj) {
  if (_.includes(_.keys(obj[key]), "assessments")) {
    const assessments = _.keys(obj[key].assessments);
    data.assessments[key] = assessments;
    assessments.forEach(assessment => {
      data.assessmentsDetails[assessment] = {
        ...obj[key].assessments[assessment],
        depth: 5,
        collapsed: true
      };
    });
  } else if (_.includes(_.keys(obj[key]), "classes")) {
    const classes = _.keys(obj[key].classes);
    data.assessments[key] = classes;
    classes.forEach(cl => {
      data.assessmentsDetails[cl] = {
        ...obj[key].classes[cl],
        collapsed: true,
        depth: 4
      };
    });
  } else if (_.includes(_.keys(obj[key]), "institutions")) {
    const classes = _.keys(obj[key].institutions);
    data.assessments[key] = classes;
    classes.forEach(cl => {
      data.assessmentsDetails[cl] = {
        ...obj[key].institutions[cl],
        collapsed: true,
        depth: 3
      };
    });
  } else {
    data.boundaries[key] = obj[key];
  }

  return data;
}

const serializeProgramBoundaries = program => {
  let boundaries = { assessments: {}, boundaries: {}, assessmentsDetails: {} };

  function traverse(o) {
    for (var i in o) {
      if (!!o[i] && typeof o[i] == "object") {
        boundaries = sortAssessments(boundaries, i, o);
        traverse(o[i]);
      }
    }
  }

  traverse(program);

  boundaries.boundaries = Object.keys(boundaries.boundaries)
    .map(a => parseInt(a))
    .filter(Boolean);
  return boundaries;
};

function processProgramDetails(programsData, programsById) {
  var newProgramsById = {};
  if (programsData.length > 0) {
    programsData.map(program => {
      newProgramsById[program.id] = program;
    });
  }
  //Merge existing program details with new info from server. This will eliminate dupes.
  var mergedProgramDetails = {};
  Object.assign(mergedProgramDetails, programsById, newProgramsById);
  return {
    programsById: mergedProgramDetails
  };
}
