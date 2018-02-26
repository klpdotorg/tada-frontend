import { push } from 'react-router-redux';

import { SERVER_API_BASE as serverApiBase } from 'config';
import { get, post, patch, deleteRequest } from './requests';
import { getPath, getEntityDepth, convertEntitiesToObject, getEntityType } from '../utils';
import {
  SET_INSTITUTION_CATS,
  SET_INSTITUTION_MANAGEMENTS,
  TOGGLE_MODAL,
  SET_BOUNDARIES,
} from './types';
import {
  responseReceivedFromServer,
  requestFailed,
  toggleModal,
  getEntities,
  closeBoundaryLoading,
  removeBoundary,
  openEntity,
} from './index';

export const toggleClassModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createClass',
  };
};

export const openTeachers = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);

    dispatch(push(`${path}/teachers/`));
  };
};

export const setInstitutionCats = (value) => {
  return {
    type: SET_INSTITUTION_CATS,
    value,
  };
};

export const setInstitutionManagements = (value) => {
  return {
    type: SET_INSTITUTION_MANAGEMENTS,
    value,
  };
};

export const fetchInstitutionDetails = (parentBoundaryId, moreIds) => {
  return (dispatch) => {
    const institutionsUrl = `${serverApiBase}institutions/?`;
    return get(`${institutionsUrl}admin3=${parentBoundaryId}`)
      .then((data) => {
        dispatch(responseReceivedFromServer(data));
        if (moreIds && moreIds.length) {
          dispatch(getEntities(moreIds));
        } else {
          dispatch(closeBoundaryLoading());
        }
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
  };
};

export const getManagements = () => {
  return (dispatch) => {
    get(`${serverApiBase}institution/managements`)
      .then((managements) => {
        const mnmts = managements.results.map((management) => {
          return {
            value: management.id,
            label: management.name,
          };
        });
        dispatch(setInstitutionManagements(mnmts));
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};

export const getInstitutionCategories = () => {
  return (dispatch) => {
    get(`${serverApiBase}institution/categories`)
      .then((categories) => {
        const filterCats = categories.results
          .filter((cat) => {
            return cat.type.id === 'primary';
          })
          .map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          });
        dispatch(setInstitutionCats(filterCats));
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};

export const modifyInstitution = (options, Id) => {
  return (dispatch, getState) => {
    const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
    const newOptions = { ...options, institution_type: boundaryType };

    patch(`${serverApiBase}institutions/${Id}/`, newOptions).then((response) => {
      dispatch(responseReceivedFromServer({ results: [response] }));
    });
  };
};

export const saveNewInstitution = (options) => {
  return (dispatch, getState) => {
    const state = getState();
    const boundaryType = state.schoolSelection.primarySchool ? 'primary' : 'pre';
    const newOptions = { ...options, institution_type: boundaryType };

    post(`${serverApiBase}institutions/`, newOptions).then((response) => {
      const entities = convertEntitiesToObject([response]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(toggleModal('createInstitution'));

      const type = getEntityType(response);
      const depth = getEntityDepth(response);
      const path = getPath(state, { uniqueId: `${response.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${response.id}${type}` }));
      dispatch(push(path));
    });
  };
};

export const deleteInstitution = (parentId, instiId) => {
  return (dispatch) => {
    return deleteRequest(`${serverApiBase}institutions/${instiId}`)
      .then((response) => {
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
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};
