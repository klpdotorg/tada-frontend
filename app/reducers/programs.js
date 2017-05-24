import _ from 'lodash';

export function programs(
  state = {
    programsById: [],
    boundaries: {
      boundaries: {},
      assessments: {},
      assessmentsDetails: {},
    },
    selected: {
      programId: '',
      assessmentId: '',
      studentgroupId: '',
      institutionId: '',
    },
  },
  action,
) {
  switch (action.type) {
    case 'PROGRAMS_RESPONSE_RECEIVED':
      const programs = processProgramDetails(action.data, state.programsById);
      return {
        ...state,
        ...programs,
      };
    case 'PROGRAM_CREATED':
      var copy = Object.assign({}, state.programsById);
      copy[action.program.id] = action.program;
      return Object.assign({}, { programsById: copy });
    case 'PROGRAM_DELETED':
      var copyState = _.omit(state.programsById, action.programId);
      return Object.assign({}, { programsById: copyState });
    case 'PROGRAM_EDITED':
      var copy = Object.assign({}, state.programsById);
      copy[action.program.id].name = action.program.name;
      copy[action.program.id].description = action.program.description;
      copy[action.program.id].start_date = action.program.start_date;
      copy[action.program.id].end_date = action.program.end_date;
      copy[action.program.id].active = action.program.active;
      copy[action.program.id].programme_institution_category =
        action.program.programme_institution_category;
      return Object.assign({}, { programsById: copy });
    case 'PROGRAM_DETAILS':
      const boundaries = serializeProgramBoundaries(action.program);
      return {
        ...state,
        boundaries,
      };
    case 'TOGGLE_PROGRAM_NODE':
      let st = _.cloneDeep(state);
      st.boundaries.details[action.id].collapsed = !st.boundaries.details[action.id].collapsed;
      return st;
    case 'SELECT_PROGRAM_BOUNDARY':
      let selected = {
        assessmentId: action.assessmentId,
        programId: action.programId,
        studentgroupId: action.studentgroupId,
        institutionId: action.institutionId,
      };
      return {
        ...state,
        selected,
      };
    default:
      return state;
  }
}

const serializeProgramBoundaries = program => {
  let programs = { parent: {}, details: {}, assessments: {} };

  function traverse(o, key, depth) {
    if (Number(key)) {
      programs.parent[key] = Object.keys(
        o.boundaries || o.assessments || o.classes || o.institutions || o.details || {},
      );
      if (key != 1) {
        o.depth = depth;
        o.collapsed = true;
        o.type = o.classes || o.institutions || o.assessments;
        programs.details[key] = _.omit(o, 'boundaries', 'assessments', 'classes', 'institutions');
        ++depth;
      }
    }
    for (var i in o) {
      if (!!o[i] && typeof o[i] == 'object') {
        traverse(o[i], i, depth);
      }
    }
  }

  traverse(program, '1', 0);

  return programs;
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
    programsById: mergedProgramDetails,
  };
}
