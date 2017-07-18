import _ from 'lodash';
import {
  processStudents,
  computeRouterPathForEntity,
  nodeDepth,
  getParentId,
  getEntityType,
  CLASS,
  INSTITUTION,
  STUDENT,
  BOUNDARY,
} from './utils';
import store from '../store';

const modalsDefault = {
  createDistrict: false,
  createBlock: false,
  createCluster: false,
  createProject: false,
  createCircle: false,
  createInstitution: false,
  createClass: false,
};

export function schoolSelection(
  state = {
    primarySchool: true,
  },
  action,
) {
  switch (action.type) {
    case 'PRIMARY_SELECTED':
      return {
        primarySchool: true,
      };
    case 'PRESCHOOL_SELECTED':
      return {
        primarySchool: false,
      };
    default:
      return state;
  }
}

/**
 + * Classes need to have a label that's a combination of name and section. This method
 + * combines the name and section and adds a label field to the boundary. NavTree will look for this
 + * field when rendering.
 + * @param {*} entity
 + */
function createLabelForClass(entity) {
  var entityType = getEntityType(entity);
  if (entityType == CLASS) {
    entity.label = entity.name + entity.section;
  }
  return entity;
}

function processBoundaryDetails(data, boundariesByParentId, boundaryDetails) {
  let init = {
    parents: _.clone(boundariesByParentId),
    details: _.clone(boundaryDetails),
  };

  const parentId = getParentId(data[0]);

  const processed = data.reduce((soFar, boundary) => {
    soFar.parents[parentId] = _.union([boundary.id], soFar.parents[parentId]);
    if (soFar.details[boundary.id] == undefined) {
      boundary.collapsed = true;
    }
    boundary = computeRouterPathForEntity(boundary, boundaryDetails);
    boundary = nodeDepth(boundary);
    boundary = createLabelForClass(boundary);

    soFar.details[boundary.id] = { ...soFar.details[boundary.id], ...boundary };
    return soFar;
  }, init);

  return {
    boundariesByParentId: processed.parents,
    boundaryDetails: processed.details,
  };
}

export function boundaries(
  state = {
    boundariesByParentId: {},
    boundaryDetails: {
      1: {
        depth: 0,
      },
    },
  },
  action,
) {
  switch (action.type) {
    case 'BOUNDARIES_FULFILLED':
      if (action.payload.results.length > 0) {
        const boundaryDetails = processBoundaryDetails(
          action.payload.results,
          state.boundariesByParentId,
          state.boundaryDetails,
        );
        return boundaryDetails;
      }
      return state;

    case 'STUDENTS_FULFILLED':
      //console.log(action.payload)
      let merged = processStudents(
        action.payload.students.results,
        action.payload.groupId,
        state.boundariesByParentId,
        state.boundaryDetails,
      );
      return {
        ...state,
        ...merged,
        isFetching: false,
      };

    case 'STUDENT_FULFILLED':
      const boundaryDetailsWithStudent = {
        ...state.boundaryDetails,
        ...{ [action.data.id]: action.data },
      };

      return {
        ...state,
        ...{ boundaryDetails: boundaryDetailsWithStudent },
      };

    case 'REQUEST_SENT':
      return {
        ...state,
        isFetching: true,
      };

    case 'TOGGLE_NODE':
      const boundary = _.clone(state.boundaryDetails[action.id]);
      if (action.open) {
        boundary.collapsed = !action.open;
      } else {
        boundary.collapsed = !boundary.collapsed;
      }

      const details = {
        ...state.boundaryDetails,
        ...{ [action.id]: boundary },
      };
      const val = {
        ...state,
        ...{ boundaryDetails: details },
      };
      return val;

    case 'REQUEST_FAILED':
      return {
        ...state,
        error: action.error,
        statusCode: action.statusCode,
        statusText: action.statusText,
        isFetching: false,
      };
    case 'REMOVE_BOUNDARY':
      let copyBoundariesByParentId = _.omit(state.boundariesByParentId, parseInt(action.id));
      if (action.parentId) {
        let index = copyBoundariesByParentId[action.parentId].indexOf(parseInt(action.id));
        copyBoundariesByParentId[action.parentId].splice(index, 1);
      } else {
        //This is a district. Therefore remove it from the parent "1"
        let index = copyBoundariesByParentId[1].indexOf(parseInt(action.id));
        copyBoundariesByParentId[1].splice(index, 1);
      }
      var newBoundaryDetails = Object.assign({}, state.boundaryDetails);
      newBoundaryDetails = _.omit(newBoundaryDetails, parseInt(action.id));
      return {
        ...state,
        boundariesByParentId: copyBoundariesByParentId,
        boundaryDetails: newBoundaryDetails,
      };

    case 'CLOSE_PEER_NODES':
      let boundaryDetails = _.clone(state.boundaryDetails);
      let openNodes = _.forEach(boundaryDetails, (value, key) => {
        if (!value.collapsed) {
          if (value.depth === action.depth && value.id != action.id) {
            value.collapsed = true;
          }
        }
      });

      return {
        ...state,
        ...{ boundaryDetails: boundaryDetails },
      };

    default:
      return state;
  }
}

export function login(
  state = {
    authenticated: false,
    isLoggingIn: false,
    error: false,
    token: '',
    id: '',
    groups: [],
    permissions: {},
    first_name: '',
    last_name: '',
  },
  action,
) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        authenticated: false,
        isLoggingIn: true,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        authenticated: action.authenticated,
        isLoggingIn: false,
        error: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticated: action.authenticated,
        token: action.auth_token,
        isLoggingIn: false,
        error: false,
        id: action.id,
      };
    case 'USER_DATA_FETCHED':
      return {
        ...state,
        username: action.username,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
        id: action.id,
        groups: action.groups,
        permissions: action.permissions,
      };

    case 'SELF_MODIFIED':
      return {
        ...state,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
      };
    case 'LOGOUT':
      return {
        authenticated: false,
        isLoggingIn: false,
        error: false,
        token: '',
        id: '',
      };
    default:
      return state;
  }
}

export function passwordreset(
  state = {
    reset_request_successful: false,
    reset_request_failed: false,
    reset_confirmed: false,
    reset_rejected: false,
  },
  action,
) {
  switch (action.type) {
    case 'RESET_REQUEST_SUCCESSFUL':
      return {
        ...state,
        reset_request_successful: true,
      };
    case 'RESET_REQUEST_FAILED':
      return {
        ...state,
        reset_request_failed: true,
      };
    case 'PASSWORD_RESET_CONFIRMED':
      return {
        ...state,
        reset_confirmed: true,
      };
    case 'PASSWORD_RESET_REJECTED':
      return {
        ...state,
        reset_rejected: true,
      };
    case 'CHANGE_PASSWORD_SUCCESSFUL':
      return {
        ...state,
        change_password_worked: true,
      };
    default:
      return state;
  }
}

export function modal(state = modalsDefault, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        [action.modal]: !state[action.modal],
      };
    default:
      return state;
  }
}
