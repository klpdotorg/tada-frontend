import { SERVER_API_BASE as serverApiBase } from 'config';
import { checkStatus, get } from './requests';
import { SET_INSTITUTION_LANGUAGES, SET_INSTITUTION_CATS } from './types';
import { responseReceivedFromServer, requestFailed } from './index';

export const setInstitutionCats = value => ({
  type: SET_INSTITUTION_CATS,
  value,
});

export const setInstitutionLanguages = value => ({
  type: SET_INSTITUTION_LANGUAGES,
  value,
});

export const fetchInstitutionDetails = parentBoundaryId => dispatch => {
  const institutionsUrl = `${serverApiBase}institutions/?`;
  return get(`${institutionsUrl}admin3=${parentBoundaryId}`)
    .then(data => {
      dispatch(responseReceivedFromServer(data));
    })
    .catch(error => {
      dispatch(requestFailed(error));
    });
};

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
      dispatch(setLanguages(langs));
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
