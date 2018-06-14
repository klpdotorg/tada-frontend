import { SERVER_STATE_BASE } from 'config';
import get from 'lodash.get';

import { SET_STATES, SELECT_STATE, STATES_LOADING } from './types';

export const selectState = (value) => {
  return {
    type: SELECT_STATE,
    value,
  };
};

export const fetchStates = (selectDefaultState) => {
  return (dispatch) => {
    dispatch({
      type: STATES_LOADING,
      value: true,
    });
    const url = `${SERVER_STATE_BASE}boundary/states`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_STATES,
          value: data.results,
        });
        if (selectDefaultState) {
          dispatch(selectState(get(data.results, '[0].state_code', '')));
        }
        dispatch({
          type: STATES_LOADING,
          value: false,
        });
      });
  };
};
