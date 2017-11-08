import { SERVER_API_BASE } from 'config';
import { get } from './requests';
import { SET_LANGUAGES } from './types';

const setLanguages = value => ({
  type: SET_LANGUAGES,
  value,
});

export const getLanguages = () => (dispatch) => {
  get(`${SERVER_API_BASE}institution/languages`)
    .then((languages) => {
      const langs = languages.results.map(language => ({
        value: language.char_id,
        label: language.name,
      }));
      dispatch(setLanguages(langs));
    })
    .catch((error) => {
      console.log('request failed', error);
    });
};
