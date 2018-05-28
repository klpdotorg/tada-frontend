import { SERVER_API_BASE as serverApiBase } from 'config';
import map from 'lodash.map';

import { SUGGESTION_RESULTS } from '../actions/types';
import { capitalize } from '../utils';

const searchAPI = `${serverApiBase}searchklp/?klp_id=`;

export const setSuggestionResults = (results) => {
  return {
    type: SUGGESTION_RESULTS,
    results,
  };
};

export const filterSearchData = (data) => {
  const institutions = map(data.institutions, (item) => {
    return {
      label: `${'Institution'} - ${item.id} - ${capitalize(item.name)}`,
      value: item.id,
      type: 'institution',
      boundaryDetails: item.boundary_details,
    };
  });

  const students = map(data.students, (item) => {
    const name = capitalize(`${item.first_name} ${item.last_name}`);

    return {
      label: `${'Student'} - ${item.id} - ${name}`,
      value: item.id,
      type: 'student',
      boundaryDetails: item.boundary_details,
    };
  });

  return [...institutions, ...students];
};

export const handleSearchText = (query) => {
  return (dispatch) => {
    fetch(`${searchAPI}${query}`)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        dispatch(setSuggestionResults(filterSearchData(json)));
      });
  };
};
