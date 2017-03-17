import { createSelector } from 'reselect';
import _ from 'lodash';
import * as CONSTANTS from '../constants';
import { getEntityType } from '../reducers/utils';

const getBoundaries = (state) => state.boundaries.boundaryDetails;
const getVisibilityFilter = (state) => state.boundaries.visibilityFilter;

export const getVisibleEntities = createSelector(
    [getBoundaries, getVisibilityFilter],
    (boundaries, visibilityFilter) => {
        case 'ALL':
            return boundaries;
        case 'INSTITUTION_LEVEL':
        _.filter(Object.values(boundaries), function(boundary) {
            return getEntityType(boundary) == CONSTANTS.INSTITUTION || CONSTANTS.BOUNDARY
        });
    }
);