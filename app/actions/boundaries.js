import { SERVER_API_BASE, STATE_CODE } from 'config';
import { get, patch } from './requests';
import {
  fetchInstitutionDetails,
  fetchStudentGroup,
  fetchStudents,
  showBoundaryLoading,
  closeBoundaryLoading,
  openNode,
} from './index';
import { SET_BOUNDARIES } from './types';

export const setBoundaries = (data) => {
  return {
    type: SET_BOUNDARIES,
    payload: data,
  };
};

export const getEntity = (parentEntityId, moreIds) => {
  return (dispatch, getState) => {
    const state = getState();
    const entity = state.boundaries.boundaryDetails[parentEntityId];

    switch (entity.depth) {
      case 2:
        return dispatch(fetchInstitutionDetails(entity.id, moreIds));
      case 3:
        return dispatch(fetchStudentGroup(entity.id, moreIds));
      case 4:
        return dispatch(fetchStudents(entity.id, moreIds));
      default:
        return dispatch(fetchBoundaries(entity.id, moreIds));
    }
  };
};

export const getEntities = (Ids) => {
  return (dispatch) => {
    const Id = Ids[0];
    const filterIds = Ids.slice(1);

    dispatch(showBoundaryLoading());
    dispatch(openNode(Id));
    dispatch(getEntity(Id, filterIds));
  };
};

export const fetchBoundaries = (parentId, moreIds) => {
  return (dispatch) => {
  // const state = getState();
  // const type = state.schoolSelection.primarySchool ? 'primary' : 'pre';

    get(`${SERVER_API_BASE}boundaries/?parent=${parentId}&limit=500&state=${STATE_CODE}`).then((response) => {
      if (response) {
        dispatch(setBoundaries(response));
        if (moreIds && moreIds.length) {
          dispatch(getEntities(moreIds));
        } else {
          dispatch(closeBoundaryLoading());
        }
      }
    });
  };
};

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
