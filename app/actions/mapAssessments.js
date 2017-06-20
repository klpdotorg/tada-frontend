export function setMapAssessmentsBoundaries(data) {
  return {
    type: 'SET_BOUNDARIES',
    payload: data,
  };
}

// MA: Map Assessments
export function toggleMapAssessmentsNode(id) {
  return {
    type: 'TOGGLE_MA_NODE',
    id,
  };
}

export function setProgramInMA(value) {
  return {
    type: 'SET_PROGRAM_IN_MA',
    value,
  };
}

export function setAssessmentTypeInMA(value) {
  return {
    type: 'SET_ASSESSMENT_TYPE_IN_MA',
    value,
  };
}


export function setMapAssessmentsClusters(data) {
  return {
    type: 'SET_MA_CLUSTERS',
    payload: data,
  };
}
