import { SERVER_API_BASE } from 'config';

import { get } from './requests';
import { SET_PARTNERS } from './types';

export const fetchPartners = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { state_code } = state.profile;
    const url = `${SERVER_API_BASE}surveys/partners/?state=${state_code}`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_PARTNERS,
        value: data.results,
      });
    });
  };
};
