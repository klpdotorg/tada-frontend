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

export function mapAssessments(
  state = {
    boundaries: {
      boundaryDetails: {
        1: {
          depth: 0,
        },
      },
      boundariesByParentId: {},
      isFetching: {},
    },
    selected: {
      navTreeBoundary: {},
      programId: {},
      assessmentIds: {},
      classIds: {},
      assessmentType: {},
    },
  },
  action,
) {
  try {
    switch (action.type) {
      case 'SET_BOUNDARIES':
        if (action.payload.results.length > 0) {
          const boundaries = processBoundaryDetails(
            action.payload.results,
            state.boundaries.boundariesByParentId,
            state.boundaries.boundaryDetails,
          );

          return {
            ...state,
            ...{
              boundaries: boundaries,
            },
          };
        }

        return state;

      case 'TOGGLE_MA_NODE':
        const boundary = _.clone(state.boundaries.boundaryDetails[action.id]);
        if (action.open) {
          boundary.collapsed = !action.open;
        } else {
          boundary.collapsed = !boundary.collapsed;
        }

        const details = {
          ...state.boundaries.boundaryDetails,
          ...{ [action.id]: boundary },
        };

        const boundaries = {
          ...state.boundaries,
          ...{ boundaryDetails: details },
        };

        return {
          ...state,
          ...{ boundaries: boundaries },
        };

      case 'SET_PROGRAM_IN_MA':
        const selected = {
          ...state.selected,
          ...{ programId: action.value },
        };

        return {
          ...state,
          ...{ selected: selected },
        };

      default:
        return state;
    }
  } catch (exception) {
    console.log(exception);
    console.log(state);
  }
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
