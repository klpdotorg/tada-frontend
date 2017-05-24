import { SERVER_API_BASE as serverApiBase } from 'config';
import { checkStatus, mapStudentsAPI } from './utils';
import {
  fetchEntitiesFromServer,
  removeBoundary,
  responseReceivedFromServer,
  studentsFetched,
} from './actions';
import { push } from 'react-router-redux';
import store from '../store';
import { computeRouterPathForEntity } from '../reducers/utils';

function dispatchToggleModal(modalType) {
  store.dispatch({
    type: 'TOGGLE_MODAL',
    modal: `${modalType}`,
  });
}

export function deleteInstitution(parentId, instiId) {
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'institutions/' + instiId + '/', {
      method: 'DELETE',
      headers: {
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(removeBoundary(instiId, parentId));
          // Route the user to the home dashboard page since the page they were on will be deleted
          dispatch(push('/'));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch(error => {
        console.log('request failed', error);
      });
  };
}

const newInstitutionFetch = options => {
  return fetch(serverApiBase + 'institutions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(options),
  }).catch(error => {
    console.log('request failed', error);
  });
};

export const saveNewInstitution = options => (dispatch, getState) => {
  return newInstitutionFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatchToggleModal('createInstitution');
    dispatch(openNode(response.id));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

const institutionFetch = options => {
  return fetch(serverApiBase + 'institutions/' + options.id + '/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(options),
  }).catch(error => {
    console.log('request failed', error);
  });
};

export const saveInstitution = options => (dispatch, getState) => {
  return institutionFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
  });
};

const classNewFetch = options => {
  return fetch(serverApiBase + 'studentgroups/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(options),
  }).catch(error => {
    console.log('request failed', error);
  });
};

const classFetch = options => {
  return fetch(serverApiBase + 'studentgroups/' + options.id + '/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(options),
  }).catch(error => {
    console.log('request failed', error);
  });
};

export const saveNewClass = options => (dispatch, getState) => {
  return classNewFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatchToggleModal('createClass');
    dispatch(openNode(response.id));
    var boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

export const saveClass = options => dispatch => {
  return classFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
  });
};

export const deleteStudentGroup = options => {
  return function(dispatch, getState) {
    return fetch(serverApiBase + 'studentgroups/' + options.id + '/', {
      method: 'DELETE',
      headers: {
        Authorization: 'Token ' + sessionStorage.token,
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          const { boundaryDetails } = getState().boundaries;
          dispatch(push(boundaryDetails[options.institution].path));
          dispatch(removeBoundary(options.id, options.institution));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch(error => {
        console.log('request failed', error);
      });
  };
};

const addStudentsFetch = options => {
  return fetch(
    serverApiBase +
      'institutions/' +
      options.institution +
      '/studentgroups/' +
      options.class +
      '/students/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + sessionStorage.token,
      },
      body: JSON.stringify(options.students),
    },
  ).catch(error => {
    console.log('request failed', error);
  });
};

export const saveNewStudents = options => dispatch => {
  return addStudentsFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
  });
};

const studentFetch = options => {
  return fetch(serverApiBase + 'students/' + options.id + '/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.token,
    },
    body: JSON.stringify(options),
  }).catch(error => {
    console.log('request failed', error);
  });
};

export const saveStudent = (options, groupId) => dispatch => {
  return studentFetch(options).then(checkStatus).then(response => {
    const data = {
      payload: {
        students: {
          results: [response],
        },
        groupId,
      },
    };
    dispatch(studentsFetched(data));
  });
};

// const  getStudentPromise = (institutionId, groupId) => {
//     var promise = new Promise(function(resolve, reject) {
//       getStudents(institutionId, groupId).then((students) => {
//         resolve({
//           students,
//           groupId
//         });
//       }).catch((e) => {
//         reject(e)
//       });
//     });

//     return promise;
//   };

//   export const getStudentsForGroupId = (institutionId, groupId) => (dispatch) => {
//     return({
//                   type: 'STUDENTS',
//                   payload: this.getStudentPromise(params.institutionId, params.groupId)
//                 });
//   };
