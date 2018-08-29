import { SERVER_API_BASE } from 'config';
import get from 'lodash.get';

import { SET_STATES, SELECT_STATE, STATES_LOADING, SET_BOUNDARIES } from './types';

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
    const url = `${SERVER_API_BASE}states`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_STATES,
          value: data.results,
        });
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: data.results.reduce((soFar, value) => {
            const result = soFar;

            result[`${value.boundary_id}state`] = {
              id: value.boundary_id,
              boundary_type: 'ST',
            };
            return result;
          }, {}),
        });
        if (selectDefaultState) {
          dispatch(selectState(get(data.results, '[0].char_id', '')));
        }
        dispatch({
          type: STATES_LOADING,
          value: false,
        });
      });
  };
};
