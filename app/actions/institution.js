import { push } from 'react-router-redux';

import { SERVER_API_BASE as serverApiBase } from 'config';
import { checkStatus, get, post, deleteRequest } from './requests';
import { SET_INSTITUTION_LANGUAGES, SET_INSTITUTION_CATS } from './types';
import {
  responseReceivedFromServer,
  requestFailed,
  openNode,
  toggleModal,
  getEntities,
  closeBoundaryLoading,
} from './index';
import { computeRouterPathForEntity } from '../reducers/utils';

export const setInstitutionCats = value => ({
  type: SET_INSTITUTION_CATS,
  value,
});

export const setInstitutionLanguages = value => ({
  type: SET_INSTITUTION_LANGUAGES,
  value,
});

export const fetchInstitutionDetails = (parentBoundaryId, moreIds) => (
  (dispatch) => {
    const institutionsUrl = `${serverApiBase}institutions/?`;
    return get(`${institutionsUrl}admin3=${parentBoundaryId}`)
    .then(data => {
      dispatch(responseReceivedFromServer(data));
      if (moreIds && moreIds.length) {
        dispatch(getEntities(moreIds));
      } else {
        dispatch(closeBoundaryLoading());
      }
    })
    .catch(error => {
      dispatch(requestFailed(error));
    });
  }
);

export const getLanguages = () => dispatch => {
  fetch(`${serverApiBase}languages/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
  })
    .then(checkStatus)
    .then(languages => {
      const langs = languages.results.map(language => ({
        value: language.id,
        label: language.name,
      }));
      dispatch(setInstitutionLanguages(langs));
    })
    .catch(error => {
      console.log('request failed', error);
    });
};

export const getInstitutionCategories = () => dispatch => {
  fetch(`${serverApiBase}institutioncategories/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${sessionStorage.token}`,
    },
  })
    .then(checkStatus)
    .then(categories => {
      const filterCats = categories.results
        .filter(cat => cat.category_type === 1)
        .map(category => ({
          value: category.id,
          label: category.name,
        }));
      dispatch(setInstitutionCats(filterCats));
    })
    .catch(error => {
      console.log('request failed', error);
    });
};

export const saveNewInstitution = (options) => (
  (dispatch, getState) => {
    const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
    const newOptions = { ...options, institution_type: boundaryType };

    post(`${serverApiBase}institutions/`, newOptions)
    .then(response => {
      dispatch(responseReceivedFromServer({ results: [response] }));
      dispatch(toggleModal('createInstitution'));
      dispatch(openNode(response.id));
      const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
      dispatch(push(boundary.path));
    });
  }
);

export const deleteInstitution = (parentId, instiId) => (dispatch, getState) => {
  return deleteRequest(`${serverApiBase}institutions/${instiId}`)
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
