import { SERVER_API_BASE } from 'config';

import { get } from './requests';
import { SET_SOURCES } from './types';

export const fetchSources = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;
    const url = `${SERVER_API_BASE}surveys/sources/?state=${state_code}`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_SOURCES,
        value: data.results,
      });
    });
  };
};
