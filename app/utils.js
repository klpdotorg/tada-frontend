import _ from 'lodash';
import moment from 'moment';

export const alphabeticalOrder = (obj, details) => {
  return obj[1].sort((a, b) => {
    const aName = _.capitalize(details[a].name);
    const bName = _.capitalize(details[b].name);
    return aName < bName ? -1 : aName > bName ? 1 : 0;
  });
};

export const toggleSet = (set, val) => {
  if (set.has(val)) {
    set.delete(val);
  } else {
    set.add(val);
  }

  return set;
};

export const capitalize = string => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return;
};

export const dateParser = date => moment(date).format('DD-MM-YYYY');
