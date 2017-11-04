import _ from 'lodash';
import { DEFAULT_PARENT_ID, DEFAULT_PARENT_NODE_ID } from 'config';
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
  getBoundaryType
} from './utils';
import store from '../store';
import {
  SET_PARENT_NODE
} from '../actions/types';

/**
 + * Classes need to have a label that's a combination of name and section. This method
 + * combines the name and section and adds a label field to the boundary. NavTree will look for this
 + * field when rendering.
 + * @param {*} entity
 + */
function createLabelForClass(entity) {
  var entityType = getEntityType(entity);
  if (entityType == CLASS) {
    entity.label = entity.name + entity.section ? entity.section : '';
  }
  return entity;
}

function processBoundaryDetails(data, boundariesByParentId, boundaryDetails, parentNode) {
  let init = {
    parents: _.clone(boundariesByParentId),
    details: _.clone(boundaryDetails),
  };

  const processed = data.reduce((soFar, boundary) => {
    const boundaryId = `${boundary.id}${getBoundaryType(boundary)}`;
    soFar.parents[parentNode] = _.union([boundaryId], soFar.parents[parentNode]);
    if (soFar.details[boundaryId] == undefined) {
      boundary.collapsed = true;
    }
    boundary = { ...boundary, parentNode }
    boundary = computeRouterPathForEntity(boundary, boundaryDetails);
    boundary = {
      ...boundary,
      depth: nodeDepth(boundary)
    };
    boundary = createLabelForClass(boundary);

    soFar.details[boundaryId] = { ...soFar.details[boundaryId], ...boundary };
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
      [DEFAULT_PARENT_NODE_ID]: {
        depth: 0,
        id: DEFAULT_PARENT_ID
      },
    },
    parentNode: DEFAULT_PARENT_NODE_ID
  },
  action,
) {
  switch (action.type) {
    case SET_PARENT_NODE:
      console.log(action.value, 'Calling set block');
      return {
        ...state,
        parentNode: action.value
      }
    case 'BOUNDARIES_FULFILLED':
      if (action.payload.results.length > 0) {
        const boundaryDetails = processBoundaryDetails(
          action.payload.results,
          state.boundariesByParentId,
          state.boundaryDetails,
          state.parentNode
        );

        return {
          ...state,
          ...boundaryDetails
        };
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

    case 'BOUNDARY_FETECHED':
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

    case 'TOGGLE_NODE': {
      const existingBoundary = state.boundaryDetails[action.id];

      const updatedBoundary = {
        ...existingBoundary,
        collapsed: action.open ? !action.open : !existingBoundary.collapsed
      };
      const boundaryType = getBoundaryType(updatedBoundary);
      let parentNode;
      if (updatedBoundary.id === DEFAULT_PARENT_ID) {
        parentNode = DEFAULT_PARENT_NODE_ID
      } else {
        parentNode = `${updatedBoundary.id}${boundaryType}`
      }

      const details = {
        ...state.boundaryDetails,
        ...{ [action.id]: updatedBoundary },
      };
      const val = {
        ...state,
        ...{
          boundaryDetails: details,
          parentNode
        },
      };
      return val;
    }

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
        const parentNode = `${value.id}${getBoundaryType(value)}`
        if (!value.collapsed) {
          if (value.depth === action.depth && parentNode !== action.id) {
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
