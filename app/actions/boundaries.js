import { SERVER_API_BASE, STATE_CODE, PER_PAGE } from 'config';
import { push } from 'react-router-redux';
import _ from 'lodash';

import { get, patch } from './requests';
import { convertEntitiesToObject, getPath } from '../utils';
import { SET_BOUNDARIES, REMOVE_EXISTING_BOUNDARIES_NODE, UNCOLLAPSED_BOUNDARIES } from './types';
import { showBoundaryLoading, closeBoundaryLoading } from './index';

export const openBoundary = (uniqueId, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, uniqueId, depth);

    dispatch(push(path));
  };
};

export const setBoundaries = (data) => {
  return {
    type: SET_BOUNDARIES,
    payload: data,
  };
};

const getUrlForBoundary = (entity) => {
  if (entity.depth < 3) {
    return `${SERVER_API_BASE}boundaries/?parent=${entity.id}&state=${STATE_CODE}&per_page=${PER_PAGE}`;
  }

  switch (entity.depth) {
    case 3:
      return `${SERVER_API_BASE}institutions/?admin3=${entity.id}&per_page=${PER_PAGE}`;
    case 4:
      return `${SERVER_API_BASE}institutions/${entity.id}/studentgroups/`;
    case 5:
      return `${SERVER_API_BASE}studentgroups/${entity.id}/students/`;
    default:
      return null;
  }
};

export const fetchBoundary = (entity, moreEntities) => {
  return (dispatch, getState) => {
    const state = getState();
    const boundary = state.boundaries.boundaryDetails[entity.uniqueId];

    const url = getUrlForBoundary({
      depth: entity.depth,
      id: boundary.id,
    });

    get(url).then((res) => {
      const entities = convertEntitiesToObject(res.results);

      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
        boundariesByParentId: { [entity.depth]: Object.keys(entities) },
      });

      if (moreEntities && moreEntities.length) {
        dispatch(fetchBoundaries(moreEntities));
      } else {
        dispatch(closeBoundaryLoading());
      }
    });
  };
};

const fetchBoundaries = (Ids) => {
  return (dispatch, getState) => {
    if (Ids.length) {
      const state = getState();
      const entity = Ids[0];
      const entities = Ids.slice(1);
      const { uncollapsedEntities } = state.boundaries;
      const currentNode = _.get(uncollapsedEntities, entity.depth);
      const existing = currentNode === entity.uniqueId;

      if (!existing && entity.depth <= 5) {
        dispatch(fetchBoundary(entity, entities));
      } else {
        dispatch(closeBoundaryLoading());
      }

      if (entity.depth > 0) {
        const depths = Object.keys(uncollapsedEntities).filter((depth) => {
          return !(depth >= entity.depth);
        });

        if (!existing) {
          depths.push(entity.depth);
        }

        const newUnCollapsedEntities = depths.reduce((soFar, depth) => {
          const value = uncollapsedEntities[depth];

          if (!value || depth === entity.depth) {
            soFar[depth] = entity.uniqueId;
          } else {
            soFar[depth] = value;
          }

          return soFar;
        }, {});

        dispatch({
          type: UNCOLLAPSED_BOUNDARIES,
          value: newUnCollapsedEntities,
        });
        dispatch({
          type: REMOVE_EXISTING_BOUNDARIES_NODE,
          value: entity.depth,
        });
      }
    }
  };
};

export const getBoundariesEntities = (Ids) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(fetchBoundaries(Ids));
  };
};

// export const getEntity = (parentEntityId, moreIds) => {
//   return (dispatch, getState) => {
//     const state = getState();
//     const entity = state.boundaries.boundaryDetails[parentEntityId];

//     switch (entity.depth) {
//       case 2:
//         return dispatch(fetchInstitutionDetails(entity.id, moreIds));
//       case 3:
//         return dispatch(fetchStudentGroup(entity.id, moreIds));
//       case 4:
//         return dispatch(fetchStudents(entity.id, moreIds));
//       default:
//         return dispatch(fetchBoundaries(entity.id, moreIds));
//     }
//   };
// };

// export const getEntities = (Ids) => {
//   return (dispatch) => {
//     const Id = Ids[0];
//     const filterIds = Ids.slice(1);
//     dispatch(showBoundaryLoading());
//     dispatch(openNode(Id));
//     dispatch(getEntity(Id, filterIds));
//   };
// };

// export const fetchBoundaries = (parentId, moreIds) => {
//   return (dispatch) => {
//     get(`${SERVER_API_BASE}boundaries/?parent=${parentId}&limit=500&state=${STATE_CODE}`).then((response) => {
//       if (response) {
//         dispatch(setBoundaries(response));
//         if (moreIds && moreIds.length) {
//           dispatch(getEntities(moreIds));
//         } else {
//           dispatch(closeBoundaryLoading());
//         }
//       }
//     });
//   };
// };

export const modifyBoundary = (boundaryId, name) => {
  return (dispatch) => {
    patch(`${SERVER_API_BASE}boundaries/${boundaryId}/`, { name })
      .then((response) => {
        dispatch(setBoundaries({ results: [response] }));
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};

// function dispatchToggleModal(modalType) {
//   store.dispatch({
//     type: 'TOGGLE_MODAL',
//     modal: `${modalType}`,
//   });
// }

// const newInstitutionFetch = options => {
//   return fetch(SERVER_API_BASE + 'institutions/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.token,
//     },
//     body: JSON.stringify(options),
//   }).catch(error => {
//     console.log('request failed', error);
//   });
// };
//
// const institutionFetch = options => {
//   return fetch(SERVER_API_BASE + 'institutions/' + options.id + '/', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.token,
//     },
//     body: JSON.stringify(options),
//   }).catch(error => {
//     console.log('request failed', error);
//   });
// };
//
// export const saveInstitution = options => (dispatch, getState) => {
//   return institutionFetch(options).then(checkStatus).then(response => {
//     if (!response) {
//       dispatch(Notifications.error(institutionNotSaved));
//     }
//     dispatch(Notifications.success(institutionSaved));
//     dispatch(responseReceivedFromServer({ results: [response] }));
//   });
// };
//
// const classNewFetch = options => {
//   return fetch(SERVER_API_BASE + 'studentgroups/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.token,
//     },
//     body: JSON.stringify(options),
//   }).catch(error => {
//     console.log('request failed', error);
//   });
// };
//
// const classFetch = options => {
//   return fetch(SERVER_API_BASE + 'studentgroups/' + options.id + '/', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.token,
//     },
//     body: JSON.stringify(options),
//   }).catch(error => {
//     console.log('request failed', error);
//   });
// };
//
// export const saveNewClass = options => (dispatch, getState) => {
//   return classNewFetch(options).then(checkStatus).then(response => {
//     dispatch(responseReceivedFromServer({ results: [response] }));
//     dispatchToggleModal('createClass');
//     dispatch(openNode(response.id));
//     var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
//     dispatch(push(boundary.path));
//   });
// };
//
// export const saveClass = options => dispatch => {
//   return classFetch(options).then(checkStatus).then(response => {
//     dispatch(responseReceivedFromServer({ results: [response] }));
//   });
// };
//
// export const deleteStudentGroup = options => {
//   return function(dispatch, getState) {
//     return fetch(SERVER_API_BASE + 'studentgroups/' + options.id + '/', {
//       method: 'DELETE',
//       headers: {
//         Authorization: 'Token ' + sessionStorage.token,
//       },
//     })
//       .then(response => {
//         if (response.status >= 200 && response.status < 300) {
//           const { boundaryDetails } = getState().boundaries;
//           dispatch(push(boundaryDetails[options.institution].path));
//           dispatch(removeBoundary(options.id, options.institution));
//         } else {
//           const error = new Error(response.statusText);
//           error.response = response;
//           throw error;
//         }
//       })
//       .catch(error => {
//         console.log('request failed', error);
//       });
//   };
// };
//
// const addStudentsFetch = options => {
//   return fetch(
//     SERVER_API_BASE +
//       'institutions/' +
//       options.institution +
//       '/studentgroups/' +
//       options.class +
//       '/students/',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Token ' + sessionStorage.token,
//       },
//       body: JSON.stringify(options.students),
//     }
//   ).catch(error => {
//     console.log('request failed', error);
//   });
// };
//
// export const saveNewStudents = options => dispatch => {
//   return addStudentsFetch(options).then(checkStatus).then(response => {
//     dispatch(responseReceivedFromServer({ results: [response] }));
//   });
// };
//
// const studentFetch = options => {
//   return fetch(SERVER_API_BASE + 'students/' + options.id + '/', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.token,
//     },
//     body: JSON.stringify(options),
//   }).catch(error => {
//     console.log('request failed', error);
//   });
// };
//
// export const saveStudent = (options, groupId) => dispatch => {
//   return studentFetch(options).then(checkStatus).then(response => {
//     const data = {
//       payload: {
//         students: {
//           results: [response],
//         },
//         groupId,
//       },
//     };
//     dispatch(studentsFetched(data));
//   });
// };
