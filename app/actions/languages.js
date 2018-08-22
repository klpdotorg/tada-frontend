import { SERVER_API_BASE } from 'config';
import isEmpty from 'lodash.isempty';

import { get } from './requests';
import { SET_LANGUAGES } from './types';

const setLanguages = (value) => {
  return {
    type: SET_LANGUAGES,
    value,
  };
};

export const getLanguages = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (isEmpty(state.languages.languages)) {
      get(`${SERVER_API_BASE}languages/`)
        .then(({ data }) => {
          const langs = data.results.map((language) => {
            return {
              value: language.char_id,
              label: language.name,
            };
          });
          dispatch(setLanguages(langs));
        })
        .catch((error) => {
          console.log('request failed', error);
        });
    }
  };
};
