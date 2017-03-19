import { createSelector } from 'reselect';
import _ from 'lodash';
import * as CONSTANTS from '../constants';
import { getEntityType } from '../reducers/utils';

const getBoundaries = (state) => state.boundaries.boundaryDetails;
const getParentChildList = (state) => state.boundaries.boundariesByParentId;

//const getVisibilityFilter = (state) => state.boundaries.visibilityFilter;

export const getVisibleEntities = createSelector(
    [getBoundaries],
    (boundaries) => {
      let results =
        _.mapValues(boundaries, function(boundary) {
            if(getEntityType(boundary) == CONSTANTS.INSTITUTION || CONSTANTS.BOUNDARY)
                return boundary;
        });
      return results;
    }
);

export const getFilteredBoundaryHierarchy = createSelector(
    [getParentChildList, getBoundaries],
    (hierarchy, details) => {
        let results= _.mapKeys(hierarchy, (value,key) => {
            //Special case this where 1 is the parent of all districts and you don't want to filter that
            if(key == 1)
                return key;
            let boundary = details[key];
            if (getEntityType(boundary) == CONSTANTS.BOUNDARY)
                return key;
        });
        return results;
    }
)