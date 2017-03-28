import _ from 'lodash';

export const alphabeticalOrder = (obj, details) => {
  return obj[1].sort((a, b) => {
    const aName = _.capitalize(details[a].name);
    const bName = _.capitalize(details[b].name);
    return (aName < bName) ? -1 : (aName > bName) ? 1 : 0
  })
}

export const toggleSet = (set, val) => {
  if (set.has(val)) {
    set.delete(val)
  } else {
    set.add(val)
  }

  return set
}
