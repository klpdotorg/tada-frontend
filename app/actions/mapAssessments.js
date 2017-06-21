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

export function setMAInstitutions(data, addInstitution) {
  return {
    type: 'SET_MA_INSTITUTIONS',
    payload: data,
    addInstitution,
  };
}

export function selectMABoundaryCategory(id) {
  return {
    type: 'SELECT_MA_BOUNDARY_CATEGORY',
    id,
  };
}

export function selectMACluster(id) {
  return {
    type: 'SELECT_MA_CLUSTER',
    id,
  };
}

export function selectMAInstitution() {
  return {
    type: 'SELECT_MA_INSTITUTION',
    id,
  };
}

export function fetchingMAClusters() {
  return {
    type: 'FETCHING_MA_CLUSTERS',
  };
}

export function fetchingMAInstitutions() {
  return {
    type: 'FETCHING_MA_INSTITUTIONS',
  };
}

export function unselectMACluster(id) {
  return {
    type: 'UNSELECT_MA_CLUSTER',
    id,
  };
}

export function unselectMAInstitution(id) {
  return {
    type: 'UNSELECT_MA_INSTITUTION',
    id,
  };
}

export function selectAllMAClusters() {
  return {
    type: 'SELECT_ALL_MA_CLUSTERS',
  };
}

export function selectAllMAInstitutions() {
  return {
    type: 'SELECT_ALL_MA_INSTITUTIONS',
  };
}

export function unselectAllMAClusters() {
  return {
    type: 'UNSELECT_ALL_MA_CLUSTERS',
  };
}

export function unselectAllMAInstitutions() {
  return {
    type: 'UNSELECT_ALL_MA_INSTITUTIONS',
  };
}
