import { push } from 'react-router-redux';

import { SERVER_API_BASE as serverApiBase } from 'config';
import { get, post, deleteRequest } from './requests';
import { getBoundaryType } from '../reducers/utils';
import {
  SET_INSTITUTION_LANGUAGES,
  SET_INSTITUTION_CATS,
  SET_INSTITUTION_MANAGEMENTS,
} from './types';
import {
  responseReceivedFromServer,
  requestFailed,
  openNode,
  toggleModal,
  getEntities,
  closeBoundaryLoading,
  removeBoundary,
} from './index';

export const setInstitutionCats = value => ({
  type: SET_INSTITUTION_CATS,
  value,
});

export const setInstitutionLanguages = value => ({
  type: SET_INSTITUTION_LANGUAGES,
  value,
});

export const setInstitutionManagements = value => ({
  type: SET_INSTITUTION_MANAGEMENTS,
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

export const getLanguages = () => (
  (dispatch) => {
    get(`${serverApiBase}institution/languages`)
    .then(languages => {
      const langs = languages.map(language => ({
        value: language.char_id,
        label: language.name,
      }));
      dispatch(setInstitutionLanguages(langs));
    })
    .catch(error => {
      console.log('request failed', error);
    });
  }
);

export const getManagements = () => (
  (dispatch) => {
    get(`${serverApiBase}institution/managements`)
    .then(managements => {
      const mnmts = managements.map(management => ({
        value: management.id,
        label: management.name,
      }));
      dispatch(setInstitutionManagements(mnmts));
    })
    .catch(error => {
      console.log('request failed', error);
    });
  }
);

export const getInstitutionCategories = () => (
  (dispatch) => {
    get(`${serverApiBase}institution/categories`)
    .then(categories => {
      const filterCats = categories.filter(cat => cat.type.id === 'primary')
      .map(category => ({
        value: category.id,
        label: category.name,
      }));
      dispatch(setInstitutionCats(filterCats));
    })
    .catch(error => {
      console.log('request failed', error);
    });
  }
);

export const saveNewInstitution = (options) => (
  (dispatch, getState) => {
    const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
    const newOptions = { ...options, institution_type: boundaryType };

    post(`${serverApiBase}institutions/`, newOptions)
    .then(response => {
      const type = getBoundaryType(response);
      dispatch(responseReceivedFromServer({ results: [response] }));
      dispatch(toggleModal('createInstitution'));
      dispatch(openNode(response.id));

      // fetching entity from store
      const boundaryDetails = getState().boundaries.boundaryDetails;
      const boundary = boundaryDetails[`${response.id}${type}`];
      console.log(boundary);
      dispatch(push(boundary.path));
    });
  }
);

export const deleteInstitution = (parentId, instiId) => (dispatch) => (
  deleteRequest(`${serverApiBase}institutions/${instiId}`)
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
  })
);
